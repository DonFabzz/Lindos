const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database'); // Assurez-vous que le chemin est correct

class Roads extends Model {}

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
    tableName: 'roads', // Le nom de la table dans la DB
    timestamps: false, // Si vous n'avez pas besoin de updatedAt, ajoutez ceci
  }
);

module.exports = Roads;