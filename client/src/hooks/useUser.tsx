import React, { useContext } from "react";
import { UserContext } from "context/user/UserContext";

export const useUser = () => {
    const { user, authenticating } = useContext(UserContext);

    return {
        user: user.data,
        authenticating
    }
}