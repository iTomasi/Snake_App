import React, { useContext } from "react";
import { UserContext } from "context/user/UserContext";

export const useUser = () => {
    const { data } = useContext(UserContext);

    return {
        user: data
    }
}