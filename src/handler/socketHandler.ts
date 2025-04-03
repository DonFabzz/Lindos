import { BoardBoxesRepository } from "@/repositories/boardBoxesRepository";
import { BoardRepository } from "@/repositories/boardRepository";
import { PlayerRepository } from "@/repositories/playerRepository";
import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";

const connectedUsers: Record<string, string> = {};

export default function socketHandler(io: Server, socket: Socket) {
  const userId = socket.handshake.query.userId as string;

  if (!userId) {
    console.log("Connexion refusée : aucun userId fourni");
    socket.disconnect();
    return;
  }

  socket.data.userId = userId;
  connectedUsers[userId] = socket.id;
  console.log("Un utilisateur connecté :", userId);

  socket.on("create-room", async () => {
    const roomId = uuidv4();
    socket.join(roomId);

    console.log(`Utilisateur ${userId} a créé la room : ${roomId}`);

    const board = await BoardRepository.createBoard(roomId);
    if (!board) return;

    await BoardBoxesRepository.generateBoxes(board.id);
    await PlayerRepository.initPlayer(board.id, userId);

    socket.emit("room-created", roomId);
  });

  socket.on("join-room", async (roomId: string) => {
    socket.join(roomId);
    console.log(`Utilisateur ${userId} a rejoint la room : ${roomId}`);

    const player = await PlayerRepository.isAlreadyRegistered(userId);
    if (!player) {
      const board = await BoardRepository.getBoardByRoomId(roomId);
      if (board) {
        PlayerRepository.initPlayer(board.id, userId);
      }
    }

    socket.emit("room-joined", { roomId, userId });
  });

  socket.on("send-message", (roomId: string, message: string) => {
    io.to(roomId).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    delete connectedUsers[userId];
    console.log("Utilisateur déconnecté :", userId);
  });
}
