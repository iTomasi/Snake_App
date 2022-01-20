import { Handler } from "express";
import { Op } from "sequelize"
import bcrypt from "bcryptjs";

// Helpers
import { email_RegExp } from "../helpers/customRegExp";
import generateJWT from "../helpers/generateJWT";
import clearUserData from "../helpers/clearUserData";

// Models
import Account from "../models/postgres/Account";

export const GET_userAuthenticated: Handler = (req, res) => {
    return res.json({
        message: "OK",
        payload: req.user,
        access_token: !req.user_access_token ? "" : req.user_access_token
    })
}

export const POST_signUpEmail: Handler = async (req, res) => {
    const { username, email, password, confirm_password } = req.body;

    if (!username || typeof username !== "string") return res.json({ message: "Username is missing" })
    else if (!email || typeof email !== "string") return res.json({ message: "Email is missing" })
    else if (!password || typeof password !== "string") return res.json({ message: "Password is missing" })
    else if (!confirm_password || typeof confirm_password !== "string") return res.json({ message: "Confirm password is missing" })

    if (username.length < 3 || username.length > 30) return res.json({ message: "Your username must contain between 3-30 characters" })
    else if (!email_RegExp.test(email.toLowerCase())) return res.json({ message: "Wrong email format, example: snake@app.com" })
    else if (password.length < 5) return res.json({ message: "Your password must containt at least 5 characters" })
    else if (password !== confirm_password) return res.json({ message: "Your confirm password not match with yout password" })

    //
    // Validations
    //

    try {
        const checkUser: any = await Account.findOne({
            where: {
                [Op.or]: [
                    { username_lower: username.toLowerCase() },
                    { email: email.toLowerCase() }
                ]
            },

            raw: true
        });

        if (checkUser) {
            if (checkUser.username_lower === username.toLowerCase()) {
                return res.json({ message: "Username already exists" })
            }

            else if (checkUser.email === email.toLowerCase()) {
                return res.json({ message: "Email already taked" })
            }

            console.log(checkUser)

            return res.json({ message: "Wtf?" })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await Account.create({
            username,
            username_lower: username.toLowerCase(),
            email,
            password: hash
        });

        const clearUser = clearUserData(user.get());

        const { accessToken } = generateJWT(clearUser);

        user.setDataValue("access_token", accessToken);

        await user.save();
        
        return res.json({
            message: "OK",
            access_token: accessToken,
            payload: clearUser
        })
    }

    catch(e) {
        console.log(e);
        console.log("POST_signUpEmail() Error");
        return res.json({
            message: "Server Error"
        })
    }
}

export const POST_signInEmail: Handler = async (req, res) => {
    const { username, password } = req.body;

    if (!username || typeof username !== "string") return res.json({ message: "Username is missing" })
    else if (!password || typeof password !== "string") return res.json({ message: "Password is missing" })

    try {
        const user = await Account.findOne({
            where: {
                [Op.or]: [
                    { username_lower: username.trim().toLowerCase() },
                    { email: username.trim().toLowerCase() }
                ]
            }
        });

        if (!user) return res.json({ message: "User not found :l" })

        const compare = await bcrypt.compare(password, user.getDataValue("password"));

        if (!compare) return res.json({ message: "Password wrong" })

        console.log(user.get());

        const clearUser = clearUserData(user.get());

        const { accessToken } = generateJWT(clearUser);

        user.setDataValue("access_token", accessToken);

        await user.save();

        console.log("AFTER")

        console.log(user.get())

        return res.json({
            message: "OK",
            access_token: accessToken,
            payload: clearUser
        })

    }

    catch(e) {
        console.log(e);
        console.log("POST_signInEmail()");
        return res.json({ message: "Server Error" })
    }
}