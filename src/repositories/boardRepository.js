const {Board} = require('../models');

module.exports = {
    createBoard: async (roomId) => {
      try {
        const newBoard = await Board.create({
          currentTurn: 0,
          lastDiceResult: 0,
          roomId: roomId,
        });

        return newBoard;
      } catch (error) {
        console.error('Erreur lors de la création de la room :', error);
      }
  }
}
