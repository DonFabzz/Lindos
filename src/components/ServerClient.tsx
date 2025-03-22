"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";

export default function ServerClient() {
    const [roomId, setRoomId] = useState<string>("");
    const [roomToJoin, setRoomToJoin] = useState<string>("");
    const [isInRoom, setIsInRoom] = useState<boolean>(false);
    const router = useRouter();
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on("room-created", (roomId: string) => {
            setRoomId(roomId);
            navigateToRoom(roomId);
            setIsInRoom(true);
        });

        socket.on("room-joined", (roomId: string) => {
            setRoomId(roomId);
            navigateToRoom(roomId);
            setIsInRoom(true);
        });

        return () => {
            socket.off("room-created");
            socket.off("room-joined");
        };
    }, [socket]);

    const createRoom = () => {
        if (socket) socket.emit("create-room");
    };

    const joinRoom = () => {
        if (socket && roomToJoin.trim() !== "") {
            socket.emit("join-room", roomToJoin);
            setRoomToJoin("");
        }
    };

    const navigateToRoom = (roomId: string) => {
        if (roomId) {
            router.push(`/game/${roomId}`);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Bienvenue</h2>
            {!isInRoom && (
                <div>
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={createRoom}>
                        Créer une Room
                    </button>
                    <br /><br />
                    <h3>Rejoindre une Room</h3>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="text"
                        value={roomToJoin}
                        onChange={(e) => setRoomToJoin(e.target.value)}
                        placeholder="Nom de la room à rejoindre"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={joinRoom}>
                        Rejoindre la Room
                    </button>
                </div>
            )}
        </div>
    );
}