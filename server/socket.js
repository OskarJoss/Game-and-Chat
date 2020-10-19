let io;
let counter = 1;
let users = [];

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer);

    io.on("connection", (socket) => {
      socket.username = `user${counter}`;
      counter++;
      console.log(`${socket.username} connected`);

      socket.on("room", (data) => {
        if (data.action === "join room") {
          if (users.length === 1 && users[0].connected) {
            //maby check if user is trying to connect with them selves
            socket.room = users[0].room;
            //maby push user to users instead and use order for player1/player2
            users = [];
            socket.join(socket.room);
            io.to(socket.room).emit("room", {
              action: "joined room",
            });
            //maby something like this here
            // io.to(socket.room).emit("game", {
            //   action: "starting",
            // });
            return;
          }

          users = [];
          socket.room = socket.id;
          users.push(socket);
        }
      });

      socket.on("chat", (data) => {
        if (data.action === "send message") {
          //maby need to check that socket.room is set
          io.to(socket.room).emit("chat", {
            action: "incoming message",
            message: data.message,
          });
        }
      });

      //need to solve what happens to the other user when someone disconnects during game
      socket.once("disconnect", () => {
        console.log(`${socket.username} disconnected`);
        if (socket.room) {
          io.to(socket.room).emit("room", { action: "opponent disconnected" });
        }
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
