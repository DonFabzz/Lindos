const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const sequelize = require('./database');
const socketHandler = require("./src/handler/socketHandler");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socketHandler(io, socket);
});

syncDatabase();
  
server.listen(3001, () => {
    console.log("Serveur Socket.io lancé sur http://localhost:3001");
});

async function syncDatabase() {
    try {
      await sequelize.sync({ force: true }); // Créera les tables dans la base de données
      console.log('Les tables ont été créées.');
    } catch (error) {
      console.error('Erreur de synchronisation de la base de données :', error);
    }
}