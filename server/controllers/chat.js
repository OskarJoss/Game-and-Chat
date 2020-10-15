exports.createMessage = (req, res, next) => {
  const io = require("../socket");
  //message might be reserved event, dont know how that affects code
  io.getIO().emit("message", { action: "created", message: req.body.message });
  //fails after a few times without a response
  res.json({ test: "chat" });
};
