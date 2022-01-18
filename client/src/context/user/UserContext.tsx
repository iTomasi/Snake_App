import {createContext} from "react";

export interface IUser {
    id: number;
    username: string;
    email: string;
    profile_picture: string;
    updatedAt: string;
    createdAt: string;
}

export interface IUserState {
    data: IUser;
    status: number;
}

export interface IUserContext {
    user: IUserState
    authenticating: (value: IUser) => void
}

export const initialState: IUserContext = {
    user: {
        data: {
            id: 0,
            username: "",
            email: "",
            profile_picture: "",
            updatedAt: "",
            createdAt: ""
        },
        status: 0
    },
    authenticating: () => {}
}

export const UserContext = createContext<IUserContext>(initialState);

