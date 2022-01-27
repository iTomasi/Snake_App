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
        if (status === 0) return
        if (status === 2 && state.socket) {
            state.socket.disconnect();
            return
        }

        dispatch({
            type: socketTypes.connect,
            payload: user.id
        });
    }, [status])

    useEffect(() => {
        if (!state.socket) return

        return () => {
            state.socket.close()
        }
    }, [state])

    return (
        <SocketContext.Provider value={{
            socket: state.socket
        }}>
            {children}
        </SocketContext.Provider>
    )
};

export default SocketState;