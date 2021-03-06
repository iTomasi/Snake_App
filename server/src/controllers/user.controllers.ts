import { Handler } from "express";

// Models
import Account from "../models/postgres/Account";

// Helpers
import clearUserData from "../helpers/clearUserData";
import verifyJWT from "../helpers/verifyJWT";
import generateJWT from "../helpers/generateJWT";

// Config
import globalsCfg from "../config/globals";

export const GET_user: Handler = async (req, res) => {
    const { username } = req.params;

    if (!username || username.length < 3) return res.json({message: "Username should contain at least 3 characters in your url"})

    let user_account: boolean = false;
    let new_access_token: string = "";

    try {
        const user: any = await Account.findOne({
            where: {
                username_lower: username.toLowerCase()
            },
            raw: true
        });

        if (!user) return res.json({ message: "Username not found" })

        const accessToken: string = req.headers["x-access-token"]?.toString() || "";
        const clearUser = clearUserData(user);

        if (accessToken) {
            const verify = verifyJWT(accessToken);

            if (verify.error) {
                const userAccessToken = await Account.findOne({
                    where: {
                        access_token: accessToken
                    }
                });

                if (userAccessToken) {
                    const userATId = userAccessToken.getDataValue("id");

                    if (userATId === user.id) {
                        const token = generateJWT(clearUser)

                        userAccessToken.setDataValue("access_token", token.accessToken);
                        await userAccessToken.save();

                        new_access_token = token.accessToken;
                        user_account = true;
                    }
                }
            }

            else {
                if (verify.data.id === user.id) {
                    user_account = true;
                }
            }
        }

        return res.json({
            message: "OK",
            data: clearUser,
            access_token: new_access_token,
            user_account
        })
    }

    catch(e) {
        console.log(e);
        console.log("GET_user() Error");
        return res.json({message: "Server Error"})
    }
}

export const PUT_updateUser: Handler = async (req, res) => {
    const body = req.body;

    const objectEntriesBody = Object.entries(body);

    if (objectEntriesBody[0] === undefined) return res.json({ message: "body blank" })

    const allowedsFields: any = globalsCfg.USER_FIELDS_ALLOWED;

    for (let i = 0; i < objectEntriesBody.length; i++) {
        const [key] = objectEntriesBody[i];

        if (!allowedsFields[key]) {
            return res.json({ message: `${key} is not allowed for edit the user` })
        }
    }

    const userDb = req.user;

    try {
        await Account.update(
            body,
            {
                where: {
                    id: userDb.id
                }
            }
        );

        return res.json({message: "OK"})
    }

    catch(e) {
        console.log(e);
        console.log("POST_updateUser() Error");
        return res.json({ message: "Server Error" })
    }
}