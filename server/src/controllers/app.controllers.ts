import { Handler } from "express";

// Models
import Account from "../models/postgres/Account";

// Helpers
import clearUserData from "../helpers/clearUserData";

export const GET_leaderboard: Handler = async (req, res) => {
    try {
        const users = await Account.findAll({ raw: true });

        const usersMap = users.map((value) => {
            return clearUserData(value, {
                email: true,
                createdAt: true,
                updatedAt: true
            })
        });

        const usersFilter = usersMap.filter((value) => value.maxScores.snake > 0);

        usersFilter.sort((a: any, b: any) => b.maxScores.snake - a.maxScores.snake);

        return res.json({
            message: "OK",
            data: usersFilter
        })
    }

    catch(e) {
        console.log(e);
        console.log("GET_leaderboard() Error");
        return res.json({message: "Server Error"})
    }
}