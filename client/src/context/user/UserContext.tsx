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
    authenticating: (value: IUser) => void;
    logout: () => void;
}

export const initialStateUser: IUserState = {
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

const initialState: IUserContext = {
    user: initialStateUser,
    authenticating: () => {},
    logout: () => {}
}

export const UserContext = createContext<IUserContext>(initialState);

