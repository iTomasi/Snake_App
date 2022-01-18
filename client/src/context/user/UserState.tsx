import React, { useReducer } from "react";
import { UserContext, initialState, IUser, IUserState } from "./UserContext";
import UserReducer from "./UserReducer";
import { userTypes } from "../types";

interface IUserStateProps {
    children: React.ReactNode;
}

const UserState = ({ children }: IUserStateProps) => {
    const [state, dispatch] = useReducer(UserReducer, initialState.user);

    const authenticating = (payload: IUser) => {
        dispatch({
            type: userTypes.authenticating,
            payload
        })
    }

    return (
        <UserContext.Provider value={{
            user: state,
            authenticating
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;