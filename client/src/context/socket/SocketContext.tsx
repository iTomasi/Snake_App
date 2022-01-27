import { createContext } from "react";
import { Socket } from "socket.io-client";

interface ISocketContext {
    socket: Socket | null;
}

export const initialState: ISocketContext = {
    socket: null
}

export const SocketContext = createContext<ISocketContext>(initialState);