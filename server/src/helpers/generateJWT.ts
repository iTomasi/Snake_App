import jwt from "jsonwebtoken";
import globalsCfg from "../config/globals";

const generateJWT = (payload: any) => {
    const accessToken = jwt.sign(
        payload,
        globalsCfg.JWT_SECRET,
        { expiresIn: 900 }
    );

    return {
        accessToken
    }
}

export default generateJWT;