import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database"; // Assurez-vous que le chemin est correct

// Définition des attributs du modèle
interface RoadsAttributes {
  id: number;
  playerId: number;
  xCoordinate: number;
  yCoordinate: number;
  createdAt?: Date;
}

// Définition des attributs optionnels pour la création
interface RoadsCreationAttributes
  extends Optional<RoadsAttributes, "id" | "createdAt"> {}

// Définition du modèle
class Roads
  extends Model<RoadsAttributes, RoadsCreationAttributes>
  implements RoadsAttributes
{
  public id!: number;
  public playerId!: number;
  public xCoordinate!: number;
  public yCoordinate!: number;
  public readonly createdAt!: Date;
}

Roads.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    xCoordinate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    yCoordinate: {
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
    tableName: "roads", // Le nom de la table dans la DB
    timestamps: false, // Désactive updatedAt
  }
);

export { Roads };
