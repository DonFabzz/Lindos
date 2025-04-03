import { Board } from "@/models/board";
import { BoardBoxes } from "@/models/boardBoxes";

// Définition des associations après les imports
Board.hasMany(BoardBoxes, {
  foreignKey: "idBoard",
  as: "Boxes",
});

BoardBoxes.belongsTo(Board, {
  foreignKey: "idBoard",
  as: "Board",
});
