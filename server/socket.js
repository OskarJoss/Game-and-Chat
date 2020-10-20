const roomController = require("./controllers/room");
const chatController = require("./controllers/chat");
const disconnectController = require("./controllers/disconnect");

let io;
let userCounter = 1;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer);

    io.on("connection", (socket) => {
      socket.username = `user${userCounter}`;
      userCounter++;
      console.log(`${socket.username} connected`);

      socket.on("room", roomController);
      socket.on("chat", chatController);
      socket.once("disconnect", disconnectController);
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("socket.io not initialized");
    }
    return io;
  },
};
