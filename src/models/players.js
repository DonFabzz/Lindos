const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database'); // Assurez-vous que le chemin est correct

class Players extends Model {}

Players.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: 'players', // Le nom de la table dans la DB
    timestamps: false, // Si vous n'avez pas besoin de updatedAt, ajoutez ceci
  }
);

module.exports = Players;