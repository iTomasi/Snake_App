import jwt from "jsonwebtoken";
import globalsCfg from "../config/globals";

const verifyJWT = (token: string) => {
    try {
        const verify: any = jwt.verify(token, globalsCfg.JWT_SECRET);

        delete verify.iat
        delete verify.exp;

        return { data: verify }

    }

    catch(e) {
        console.log("decodedJWT() token expired or invalid :l")
        return { error: true }
    }
};

export default verifyJWT;