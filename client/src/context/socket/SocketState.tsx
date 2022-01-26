import React, { useReducer, useEffect } from "react";
import { SocketContext, initialState } from "./SocketContext";
import socketReducer from "./socketReducer";
import { socketTypes } from "../types";

// Hooks
import { useUser } from "hooks/useUser";

interface ISocketStateProps {
    children: React.ReactNode;
}

const SocketState = ({ children }: ISocketStateProps) => {
    const { status, user } = useUser();

    const [state, dispatch] = useReducer(socketReducer, initialState)

    useEffect(() => {
        if (status !== 1) return

        dispatch({
            type: socketTypes.connect,
            payload: user.id
        })

    }, [status])

    return (
        <SocketContext.Provider value={{
            socket: state
        }}>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketState;