require("dotenv").config();
const { Sequelize } = require("sequelize");

// Créer une instance Sequelize avec les paramètres de ta base de données
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("La connexion à la base de données a réussi.");
  } catch (error) {
    console.error("Impossible de se connecter à la base de données :", error);
  }
}

testConnection();

module.exports = sequelize;
