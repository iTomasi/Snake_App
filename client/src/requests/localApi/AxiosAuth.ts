import { AxiosLocalApi } from "../AxiosBase";

// Helpers
import { email_RegExp } from "helpers/customRegExp";

interface IAxiosSignUpEmail {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

export const AxiosSignUpEmail = async (payload: IAxiosSignUpEmail) => {
    const { username, email, password, confirm_password } = payload;

    if (username.length < 3 || username.length > 30) return { error: "Your username must contain between 3-30 characters" }
    else if (!email_RegExp.test(email.toLowerCase())) return { error: "Wrong email format, example: snake@app.com" }
    else if (password.length < 5) return { error: "Your password must contain at least 5 characters" }
    else if (password !== confirm_password) return { error: "Confirm password not match with your password" }

    try {
        const { data } = await AxiosLocalApi.post(
            "/auth/sign-up",
            payload,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        console.log(data);

        if (data.message !== "OK") return { error: data.message }

        return {
            success: "PRO"
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosSignUpEmail() Error");
        return { error: "Server Error Connection" }
    }
}