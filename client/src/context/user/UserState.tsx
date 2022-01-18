import React, { useReducer } from "react";
import { UserContext, initialState } from "./UserContext";
import UserReducer from "./UserReducer";

interface IUserStateProps {
    children: React.ReactNode;
}

const UserState = ({ children }: IUserStateProps) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;