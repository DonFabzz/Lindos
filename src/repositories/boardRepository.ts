import { Board } from "@/models/board";
import { BoardBoxes } from "@/models/boardBoxes";

export const BoardRepository = {
  createBoard: async (roomId: string): Promise<Board | null> => {
    try {
      const newBoard = await Board.create({
        currentTurn: 0,
        lastDiceResult: 0,
        roomId,
      });

      return newBoard;
    } catch (error) {
      console.error("Erreur lors de la création de la room :", error);
      return null;
    }
  },

  getBoardByRoomId: async (roomId: string): Promise<Board | null> => {
    return await Board.findOne({
      where: { roomId },
      include: [
        {
          model: BoardBoxes,
          as: "Boxes",
          attributes: ["id", "idBoard", "position", "type", "diceNumber"],
        },
      ],
    });
  },
};
