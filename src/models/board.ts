import sequelize from "@/database/database";
import { DataTypes, Model, Optional } from "sequelize";
import { BoardBoxes } from "./boardBoxes";

// Définition des attributs du modèle
interface BoardAttributes {
  id: number;
  roomId: string;
  currentTurn: number;
  lastDiceResult: number;
  createdAt?: Date;
}

// Définition des attributs optionnels pour la création
interface BoardCreationAttributes
  extends Optional<BoardAttributes, "id" | "createdAt"> {}

// Définition du modèle
class Board
  extends Model<BoardAttributes, BoardCreationAttributes>
  implements BoardAttributes
{
  public id!: number;
  public roomId!: string;
  public currentTurn!: number;
  public lastDiceResult!: number;
  public readonly createdAt!: Date;
}

Board.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentTurn: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastDiceResult: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "board",
    timestamps: false, // Désactive updatedAt
  }
);

export { Board };
