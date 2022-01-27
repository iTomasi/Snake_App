import { createContext } from "react";
import { IUserEditAxios } from "types/User";

export interface IUser {
    id: number;
    username: string;
    email: string;
    profile_picture: string;
    maxScores: {
        snake: number
    }
    updatedAt: string;
    createdAt: string;
}

export interface IUserState {
    data: IUser;
    status: number;
}

export interface IUserContext {
    user: IUserState
    authenticating: (value: IUser) => void;
    logout: () => void;
    updateUser: (payload: IUserEditAxios) => void;
}

export const initialStateUser: IUserState = {
    data: {
        id: 0,
        username: "",
        email: "",
        profile_picture: "",
        maxScores: {
            snake: 0
        },
        updatedAt: "",
        createdAt: ""
    },
    status: 0
}

const initialState: IUserContext = {
    user: initialStateUser,
    authenticating: () => {},
    logout: () => {},
    updateUser: () => {}
}

export const UserContext = createContext<IUserContext>(initialState);

