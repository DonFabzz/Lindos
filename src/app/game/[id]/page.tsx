"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSocket } from "@/context/SocketContext";

export default function GamePage() {
    const params = useParams();
    const id = params?.id ?? ""; 
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>("");
    const socket = useSocket();

    useEffect(() => {
        if (!id || !socket) return;

        socket.emit("join-room", id);

        const handleReceiveMessage = (msg: string) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("receive-message", handleReceiveMessage);

        return () => {
            socket.off("receive-message", handleReceiveMessage);
        };
    }, [id, socket]);

    const sendMessage = () => {
        if (message.trim() !== "" && socket) {
            socket.emit("send-message", id, message);
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Room {id}</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écris un message..."
            />
            <button onClick={sendMessage}>Envoyer</button>
        </div>
    );
}