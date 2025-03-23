const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database'); // Assurez-vous que le chemin est correct

class Board extends Model {}

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
    tableName: 'board', // Le nom de la table dans la DB
    timestamps: false, // Si vous n'avez pas besoin de updatedAt, ajoutez ceci
  }
);

module.exports = Board;