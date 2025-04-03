"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Vérifier si un identifiant utilisateur existe, sinon en générer un
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }

    // Connexion à Socket.io avec transmission de l'userId
    const socketInstance = io("http://localhost:3001", {
      query: { userId },
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => setIsConnected(true));

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  if (!isConnected) {
    return <div>Connexion en cours...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
