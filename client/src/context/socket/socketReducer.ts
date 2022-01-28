import { io } from "socket.io-client";
import { socketTypes } from "../types";

const socketReducer = (state: any, action: any) => {
    const { type, payload } = action;

    switch(type) {
        case socketTypes.connect:
            const socket = io(process.env.NEXT_PUBLIC_API_LOCAL || "http://localhost:4000", {
                query: {
                    userId: payload
                }
            });

            return {
                ...state,
                socket
            }
        default:
            return state
    }
};

export default socketReducer;