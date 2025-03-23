const { Sequelize } = require('sequelize');

// Créer une instance Sequelize avec les paramètres de ta base de données
const sequelize = new Sequelize('lindos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('La connexion à la base de données a réussi.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
}

testConnection();

module.exports = sequelize;
