import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/database"; // Assurez-vous que le chemin est correct

// Définition des attributs du modèle
interface CitiesAttributes {
  id: number;
  playerId: number;
  cityType: "war" | "fortified" | "cultural" | "merchant";
  xCoordinate: number;
  yCoordinate: number;
  createdAt?: Date;
}

// Définition des attributs optionnels pour la création
interface CitiesCreationAttributes
  extends Optional<CitiesAttributes, "id" | "createdAt"> {}

// Définition du modèle
class Cities
  extends Model<CitiesAttributes, CitiesCreationAttributes>
  implements CitiesAttributes
{
  public id!: number;
  public playerId!: number;
  public cityType!: "war" | "fortified" | "cultural" | "merchant";
  public xCoordinate!: number;
  public yCoordinate!: number;
  public readonly createdAt!: Date;
}

Cities.init(
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
    cityType: {
      type: DataTypes.ENUM("war", "fortified", "cultural", "merchant"),
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
    tableName: "cities", // Le nom de la table dans la DB
    timestamps: false, // Désactive updatedAt
  }
);

export default Cities;
