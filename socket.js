const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Un utilisateur connecté :", socket.id);

    socket.on("create-room", () => {
        console.log('room ok');
        const roomId = uuidv4();  // Génération d'un ID unique pour la room
        socket.join(roomId);
        console.log(`Utilisateur ${socket.id} a créé la room : ${roomId}`);
        socket.emit("room-created", roomId);
    });

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`Utilisateur ${socket.id} a rejoint la room : ${roomId}`);
        socket.emit("room-joined", roomId);
    });

    socket.on("send-message", (roomId, message) => {
        console.log('ok');
        io.to(roomId).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
        console.log("Utilisateur déconnecté :", socket.id);
    });
});

server.listen(3001, () => {
    console.log("Serveur Socket.io lancé sur http://localhost:3001");
});
