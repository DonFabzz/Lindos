import "dotenv/config";
import { Sequelize } from "sequelize";

// Créer une instance Sequelize avec les paramètres de la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "mysql",
  }
);

async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("La connexion à la base de données a réussi.");
  } catch (error) {
    console.error("Impossible de se connecter à la base de données :", error);
  }
}

testConnection();

export default sequelize;
