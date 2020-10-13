exports.sendMessage = (req, res, next) => {
  const io = require("../socket");
  io.getIO().emit("message", { action: "create", post: "yo" });
};
