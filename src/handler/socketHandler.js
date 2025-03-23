const { generateBoxes } = require('../repositories/boardBoxesRepository');
const { createBoard } = require('../repositories/boardRepository');
const { v4: uuidv4 } = require("uuid");

module.exports = (io, socket) => {
    console.log("Un utilisateur connecté :", socket.id);

    socket.on("create-room", async () => {
        const roomId = uuidv4();
        socket.join(roomId);
        console.log(`Utilisateur ${socket.id} a créé la room : ${roomId}`);
        board = await createBoard(roomId);
        console.log('id board ' + board);
        generateBoxes(board.id);
        socket.emit("room-created", roomId);
    });

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`Utilisateur ${socket.id} a rejoint la room : ${roomId}`);
        socket.emit("room-joined", roomId);
    });

    socket.on("send-message", (roomId, message) => {
        io.to(roomId).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
        console.log("Utilisateur déconnecté :", socket.id);
    });
};