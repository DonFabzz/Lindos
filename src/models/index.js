const Board = require('./board');
const BoardBoxes = require('./boardBoxes');
const Cities = require('./cities');
const Players = require('./players');
const Roads = require('./roads');

// Définir les relations ici (par exemple, Board.hasMany(Players))

module.exports = {
  Board,
  BoardBoxes,
  Cities,
  Players,
  Roads,
};