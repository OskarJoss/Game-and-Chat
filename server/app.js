const express = require("express");

const chatRoutes = require("./routes/chat");

const app = express();

app.use(chatRoutes);

app.listen(9000);
