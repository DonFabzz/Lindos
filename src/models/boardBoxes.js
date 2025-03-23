const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database'); // Assurez-vous que le chemin est correct

class BoardBoxes extends Model {}

BoardBoxes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idBoard:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('stone', 'sheep', 'wood', 'clay', 'straw', 'gold'),
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
    tableName: 'board_boxes', // Le nom de la table dans la DB
    timestamps: false, // Si vous n'avez pas besoin de updatedAt, ajoutez ceci
  }
);

module.exports = BoardBoxes;