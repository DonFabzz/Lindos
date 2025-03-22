"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = io("http://localhost:3001");
        setSocket(socketInstance);

        socketInstance.on("connect", () => setIsConnected(true));

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    if (!isConnected) {
        return <div>Connexion en cours...</div>; // Empêche d'afficher les enfants tant que le socket n'est pas prêt
    }

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket; // Retourne le socket, même s'il est null au début
};
