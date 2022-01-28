import React, { useState, useEffect } from "react";

// Components
import UserTable from "components/leaderboard/UserTable";

// Requests
import { AxiosGetLeaderboard } from "requests/localApi/AxiosApp";

const LeaderBoard = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const effectFunc = async () => {
            const { error, data } = await AxiosGetLeaderboard();

            if (error) return console.log(error)

            setData(data)
        }

        effectFunc();
    }, [])

    return (
        <div>
            <UserTable
                data={data}
            />
        </div>
    )
};

export default LeaderBoard;