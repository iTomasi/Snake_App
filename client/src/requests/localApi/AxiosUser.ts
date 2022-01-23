import { AxiosLocalApi } from "../AxiosBase";
import { IUserEditAxios } from "types/User";
import { getCookie } from "helpers/handleCookie";

export const AxiosGetUser = async (username: string, token: string) => {
    if (!username || username.length < 3) return { error: "Username should contain at least 3 characters in your url" }

    try {
        const { data } = await AxiosLocalApi.get(`/user/${username}`, {
            headers: {
                "x-access-token": token
            }
        });

        if (data.message !== "OK") return { error: data.message }

        return {
            data: {
                payload: data.data,
                access_token: data.access_token,
                user_account: data.user_account
            }
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosGetUser() Error");
        return { error: "Server Error Connection" }
    }
}

export const AxiosEditUser = async (payload: IUserEditAxios) => {
    const userToken = getCookie("token");

    if (!userToken) return { error: "No logged" }

    try {
        const { data } = await AxiosLocalApi.put(
            "/user",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                }
            }
        );

        console.log(data)

        if (data.message !== "OK") return { error: data.message }

        return {
            success: "PRO"
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosEditUser() Error");
        return { error: "Server Error Connection" }
    }

    
}