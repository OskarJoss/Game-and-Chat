let counter = 0;

exports.joinRoom = (req, res, next) => {
  const io = require("../socket");
  io.getIO().emit("joinedRoom", {
    action: "joined",
    message: "yoyoyoyo joined",
  });
  //fails after a few times without a response
  res.json({ test: "rooms", counter: counter });
  counter++;
};
