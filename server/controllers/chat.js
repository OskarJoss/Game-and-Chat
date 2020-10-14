exports.createMessage = (req, res, next) => {
  const io = require("../socket");
  console.log(req.body.message);
  io.getIO().emit("message", { action: "created", post: "yo" });
};
