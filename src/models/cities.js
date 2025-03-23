const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../database'); // Assurez-vous que le chemin est correct

class Cities extends Model {}

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
      type: DataTypes.ENUM('war', 'fortified', 'cultural', 'merchant'),
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
    tableName: 'cities', // Le nom de la table dans la DB
    timestamps: false, // Si vous n'avez pas besoin de updatedAt, ajoutez ceci
  }
);

module.exports = Cities;