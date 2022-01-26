import { createContext } from "react";
import { Socket } from "socket.io-client";

interface ISocketContext {
    socket: Socket | object;
}

export const initialState: ISocketContext = {
    socket: {}
}

export const SocketContext = createContext<ISocketContext>(initialState);