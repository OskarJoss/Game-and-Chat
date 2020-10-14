exports.createMessage = (req, res, next) => {
  const io = require("../socket");
  io.getIO().emit("message", { action: "created", message: req.body.message });
  //fails after a few times without a response
  res.json({ test: "ok" });
};
