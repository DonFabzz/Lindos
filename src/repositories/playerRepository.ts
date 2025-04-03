import { Players } from "@/models/players";

export const PlayerRepository = {
  initPlayer: async (boardId: number, userId: string) => {
    try {
      return await Players.create({
        userId,
        name: "test",
        boardId,
        stone: 0,
        sheep: 0,
        straw: 0,
        clay: 0,
        wood: 0,
        gold: 0,
      });
    } catch (error) {
      console.error("Erreur lors de la création du joueur :", error);
    }
  },

  isAlreadyRegistered: async (userId: string) => {
    return await Players.findOne({ where: { userId } });
  },
};
