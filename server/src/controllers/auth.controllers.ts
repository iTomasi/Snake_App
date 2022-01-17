import { Handler } from "express";

export const POST_signUpEmail: Handler = (req, res) => {
    console.log(req.body);

    res.json({message: "OK"})
}