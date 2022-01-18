import { IUserState } from "./UserContext";
import { userTypes } from "../types";

const UserReducer = (state: IUserState, action: any) => {
    const { type, payload } = action;

    switch(type) {
        case userTypes.authenticating:
            return {
                ...state,
                data: payload,
                status: 1
            }
        default:
            return state
    }
}

export default UserReducer;