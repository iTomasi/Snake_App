import { IUserContext } from "./UserContext";

const UserReducer = (state: IUserContext, action: any) => {
    const { type, payload } = action;

    switch(type) {
        case "asdasdasd":
            return state;
        default:
            return state
    }
}

export default UserReducer;