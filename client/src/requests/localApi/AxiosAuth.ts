import { AxiosLocalApi } from "../AxiosBase";

// Helpers
import { email_RegExp } from "helpers/customRegExp";
import { getCookie } from "helpers/handleCookie";

interface IAxiosSignUpEmail {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

interface IAxiosSignInEmail {
    username: string;
    password: string;
}

export const AxiosUserAuthenticated = async () => {
    const userToken = getCookie("token");

    if (!userToken) return { error: "No authenticated" }

    try {
        const { data } = await AxiosLocalApi.get(
            "/auth",
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`
                }
            }
        );

        if (data.message !== "OK") return { error: data.message }

        if (data.access_token) {
            const expiresTokenTime = new Date(Date.now() + (432000 * 1000));

            document.cookie = `token=${data.access_token}; path=/; expires="${expiresTokenTime.toUTCString()}"`;
        }

        return {
            data: data.payload
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosUserAuthenticated() Error");
        return { error: "Server Error Conenction" }
    }
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

        if (data.message !== "OK") return { error: data.message }

        const expiresTokenTime = new Date(Date.now() + (432000 * 1000));

        document.cookie = `token=${data.access_token}; path=/; expires="${expiresTokenTime.toUTCString()}"`

        return {
            data: data.payload
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosSignUpEmail() Error");
        return { error: "Server Error Connection" }
    }
}

export const AxiosSignInEmail = async (payload: IAxiosSignInEmail) => {
    const { password } = payload;

    if (password.length < 5) return { error: "Your password must contain at least 5 characters" }

    try {
        const { data } = await AxiosLocalApi.post(
            "/auth/sign-in",
            payload,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (data.message !== "OK") return { error: data.message }

        const expiresTokenTime = new Date(Date.now() + (432000 * 1000));

        document.cookie = `token=${data.access_token}; path=/; expires="${expiresTokenTime.toUTCString()}"`

        return {
            data: data.payload
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosSignInEmail()");
        return { error: "Server Error" }
    }
}