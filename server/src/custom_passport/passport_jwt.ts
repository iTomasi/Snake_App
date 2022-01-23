import { Handler } from "express";
import Account from "../models/postgres/Account";
import verifyJWT from "../helpers/verifyJWT";
import generateJWT from "../helpers/generateJWT";
import clearUserData from "../helpers/clearUserData";

const passport_jwt: Handler = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.json({ message: "Authorization header is missing" })
    else if (!authorization.startsWith("Bearer ")) return res.json({message: "Authorization value should start 'Bearer <token>'"})

    const split = authorization.split(" ");

    try {
        const user = await Account.findOne({
            where: {
                access_token: split[1]
            }
        });

        if (!user) return res.json({ message: "User not found or not exists" })

        const clearUser = clearUserData(user.get());

        const verifyToken = verifyJWT(user.getDataValue("access_token"));

        if (verifyToken.error) {
            const { accessToken } = generateJWT(clearUser);

            user.setDataValue("access_token", accessToken);

            await user.save();

            req.user_access_token = accessToken;
        }

        req.user = clearUser;

        return next();
    }

    catch(e) {
        console.log(e);
        console.log("passport_jwt() error");
        return res.json({ message: "Server Error" })
    }
};

export default passport_jwt;