import React, { useEffect } from "react";

// Requests
import { AxiosGetLeaderboard } from "requests/localApi/AxiosApp";

const LeaderBoard = () => {

    useEffect(() => {
        const effectFunc = async () => {
            const { error, data } = await AxiosGetLeaderboard();

            if (error) return console.log(error)

            console.log(data)

        }

        effectFunc();
    }, [])

    return (
        <div>
            LeaderBoard
        </div>
    )
};

export default LeaderBoard;