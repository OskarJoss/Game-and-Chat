exports.createMessage = (req, res, next) => {
  const io = require("../socket");
  io.getIO().emit("message", { action: "created", message: req.body.message });
};
