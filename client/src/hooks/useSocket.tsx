import React, { useContext } from "react";
import { SocketContext } from "context/socket/SocketContext"

export const useSocket = () => {
    const { socket } = useContext(SocketContext);

    return socket
}