import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import sequelize from "@/database/database";
import "@/models/associations";
import cors from "cors";
import socketHandler from "@/handler/socketHandler";
import { BoardRepository } from "./repositories/boardRepository";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:3000", // Autoriser Next.js
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Autoriser les cookies et headers d'authentification
  })
);

app.get("/express/board/:roomId", async (req, res) => {
  console.log("maroute");
  const { roomId } = req.params;
  const board = await BoardRepository.getBoardByRoomId(roomId);
  if (board) {
    res.json(board);
  } else {
    res.status(404).json({ error: "Board not found" });
  }
});

io.on("connection", (socket: Socket) => {
  socketHandler(io, socket);
});

syncDatabase();

app.listen(3002, () => {
  console.log(`🚀 Serveur Express lancé sur http://localhost:3002}`);
});

server.listen(3001, () => {
  console.log("Serveur Socket.io lancé sur http://localhost:3001");
});

async function syncDatabase(): Promise<void> {
  try {
    await sequelize.sync({ force: true }); // Créera les tables dans la base de données
    console.log("Les tables ont été créées.");
  } catch (error) {
    console.error("Erreur de synchronisation de la base de données :", error);
  }
}
