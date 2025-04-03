import { BoardBoxes } from "@/models/boardBoxes";

const ressourcesTypes: (
  | "stone"
  | "sheep"
  | "wood"
  | "clay"
  | "straw"
  | "gold"
)[] = [
  "stone",
  "stone",
  "stone",
  "sheep",
  "sheep",
  "sheep",
  "sheep",
  "wood",
  "wood",
  "wood",
  "clay",
  "clay",
  "clay",
  "straw",
  "straw",
  "straw",
  "gold",
  "gold",
  "gold",
];

const numbers: number[] = [
  2, 12, 7, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11,
];

const boardSize = 19;

export const BoardBoxesRepository = {
  generateBoxes: async (idBoard: number): Promise<void> => {
    shuffleArray(numbers);
    shuffleArray(ressourcesTypes);

    try {
      for (let i = 0; i < boardSize; i++) {
        await BoardBoxes.create({
          idBoard,
          position: i + 1,
          type: ressourcesTypes[i],
          diceNumber: numbers[i],
        });
      }
      console.log("Plateau généré avec succès !");
    } catch (error) {
      console.error("Erreur lors de la génération des cases :", error);
    }
  },
};

function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
