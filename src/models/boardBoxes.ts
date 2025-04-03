import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/database/database"; // Assurez-vous que le chemin est correct
import { Board } from "./board";

// Définition des attributs du modèle
interface BoardBoxesAttributes {
  id: number;
  idBoard: number;
  position: number;
  type: "stone" | "sheep" | "wood" | "clay" | "straw" | "gold";
  diceNumber: number;
  createdAt?: Date;
}

// Définition des attributs optionnels pour la création
interface BoardBoxesCreationAttributes
  extends Optional<BoardBoxesAttributes, "id" | "createdAt"> {}

// Définition du modèle
class BoardBoxes
  extends Model<BoardBoxesAttributes, BoardBoxesCreationAttributes>
  implements BoardBoxesAttributes
{
  public id!: number;
  public idBoard!: number;
  public position!: number;
  public type!: "stone" | "sheep" | "wood" | "clay" | "straw" | "gold";
  public diceNumber!: number;
  public readonly createdAt!: Date;
}

BoardBoxes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idBoard: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("stone", "sheep", "wood", "clay", "straw", "gold"),
      allowNull: false,
    },
    diceNumber: {
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
    tableName: "board_boxes", // Le nom de la table dans la DB
    timestamps: false, // Désactive updatedAt
  }
);

export { BoardBoxes };
