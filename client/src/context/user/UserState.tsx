import React, { useReducer, useEffect } from "react";
import { UserContext, initialStateUser, IUser } from "./UserContext";
import UserReducer from "./UserReducer";
import { userTypes } from "../types";
import { removeCookie } from "helpers/handleCookie";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

// Axios
import { AxiosUserAuthenticated } from "requests/localApi/AxiosAuth";

interface IUserStateProps {
    children: React.ReactNode;
}

const UserState = ({ children }: IUserStateProps) => {
    const router = useRouter();
    const [state, dispatch] = useReducer(UserReducer, initialStateUser);

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

    const logout = () => {
        removeCookie("token")

        dispatch({
            type: userTypes.logout,
            payload: initialStateUser.data
        });

        router.push("/auth/sign-in")
        toast.success("Logout")
    }

    return (
        <UserContext.Provider value={{
            user: state,
            authenticating,
            logout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState;