import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "@/database/database"; // Assurez-vous que le chemin est correct

// Définition des attributs du modèle
interface PlayersAttributes {
  id: number;
  userId: string;
  name: string;
  boardId: number;
  stone: number;
  sheep: number;
  gold: number;
  clay: number;
  straw: number;
  wood: number;
  createdAt?: Date;
}

// Définition des attributs optionnels pour la création
interface PlayersCreationAttributes
  extends Optional<PlayersAttributes, "id" | "createdAt"> {}

// Définition du modèle
class Players
  extends Model<PlayersAttributes, PlayersCreationAttributes>
  implements PlayersAttributes
{
  public id!: number;
  public userId!: string;
  public name!: string;
  public boardId!: number;
  public stone!: number;
  public sheep!: number;
  public gold!: number;
  public clay!: number;
  public straw!: number;
  public wood!: number;
  public readonly createdAt!: Date;
}

Players.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sheep: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gold: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clay: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    straw: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wood: {
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
    tableName: "players", // Le nom de la table dans la DB
    timestamps: false, // Désactive updatedAt
  }
);

export { Players };
