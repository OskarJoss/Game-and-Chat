const ticTacToeController = function (data) {
  const socket = this;
  const io = require("../socket").getIO();

  if (data.action === "start game") {
    //get socket ids from users connected to this room
    const players = Object.keys(io.sockets.adapter.rooms[socket.room].sockets);
    socket.playerOne = players[0];
    socket.playerTwo = players[1];
    socket.gameState = {
      turn: socket.playerOne,
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    };

    io.to(socket.room).emit("tic-tac-toe", {
      action: "initial state",
      gameState: socket.gameState,
    });
  }
};

module.exports = ticTacToeController;
