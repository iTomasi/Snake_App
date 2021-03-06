import React, { useContext } from "react";
import { UserContext } from "context/user/UserContext";

export const useUser = () => {
    const { user, authenticating, logout, updateUser } = useContext(UserContext);

    return {
        user: user.data,
        status: user.status,
        authenticating,
        logout,
        updateUser
    }
}