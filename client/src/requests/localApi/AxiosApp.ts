import { AxiosLocalApi } from "../AxiosBase";

export const AxiosGetLeaderboard = async () => {
    try {
        const { data } = await AxiosLocalApi.get("/app/leaderboard");

        if (data.message !== "OK") return { error: data.message }

        return {
            data: data.data
        }
    }

    catch(e) {
        console.log(e);
        console.log("AxiosGetLeaderboard() Error");
        return { error: "Server Error Connection" }
    }
}