import {createContext} from "react";

export interface IUser {
    id: number;
    username: string;
    email: string;
    profile_picture: string;
    updatedAt: string;
    createdAt: string;
}

export interface IUserContext {
    data: IUser;
    status: number;
}

export const initialState: IUserContext = {
    data: {
        id: 0,
        username: "",
        email: "",
        profile_picture: "",
        updatedAt: "",
        createdAt: ""
    },
    status: 0
}

export const UserContext = createContext<IUserContext>(initialState);

