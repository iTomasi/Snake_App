import React, { useReducer, useEffect } from "react";
import { UserContext, initialState, IUser } from "./UserContext";
import UserReducer from "./UserReducer";
import { userTypes } from "../types";

// Axios
import { AxiosUserAuthenticated } from "requests/localApi/AxiosAuth";

interface IUserStateProps {
    children: React.ReactNode;
}

const UserState = ({ children }: IUserStateProps) => {
    const [state, dispatch] = useReducer(UserReducer, initialState.user);

    useEffect(() => {
        const effectFunc = async () => {
            const { error, data } = await AxiosUserAuthenticated();

            if (error) {
                dispatch({ type: userTypes.no_authenticated })
                return
            }

            dispatch({
                type: userTypes.authenticated,
                payload: data
            })
        }

        effectFunc();
    }, [])

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