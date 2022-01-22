import { IUserState } from "./UserContext";
import { userTypes } from "../types";

const UserReducer = (state: IUserState, action: any) => {
    const { type, payload } = action;

    switch(type) {
        case userTypes.authenticated:
            return {
                ...state,
                data: payload,
                status: 1
            }
        
        case userTypes.no_authenticated:
            return {
                ...state,
                status: 2
            }

        case userTypes.authenticating:
            return {
                ...state,
                data: payload,
                status: 1
            }
    
        case userTypes.logout:
            return {
                ...state,
                data: payload,
                status: 2
            }
        default:
            return state
    }
}

export default UserReducer;