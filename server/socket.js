let io;
let counter = 1;

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer);

    io.on("connection", (socket) => {
      socket.username = `user${counter}`;
      counter++;
      console.log(`${socket.username} connected`);

      socket.on("chat", (data) => {
        if (data.action === "send message") {
          io.emit("chat", {
            action: "incoming message",
            message: data.message,
          });
        }
      });

      socket.once("disconnect", () => {
        console.log(`${socket.username} disconnected`);
      });
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
