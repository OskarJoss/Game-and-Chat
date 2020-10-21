const ticTacToeController = function (data) {
  const socket = this;
  const io = require("../socket").getIO();

  if (data.action === "start") {
    console.log("start game and stuff");
  }
};

module.exports = ticTacToeController;
