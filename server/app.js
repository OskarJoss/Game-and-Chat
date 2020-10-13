const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chat");

const app = express();

//cors settings
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(chatRoutes);

const server = app.listen(9000);
const io = require("./socket").init(server);
io.on("connection", (socket) => {
  console.log("client connected");
});
