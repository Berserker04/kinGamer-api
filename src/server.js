const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
// const path2 = require("");

require("./config");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

const route = require("./network");
route(app);


io.on("connection", (socket) => {
  console.log("se conecto");
  socket.emit("con", "Nuevo contectado!");
});

io.on("msg", (socket) => {
  console.log("socket", socket);
  // socket.emit(msg, "Nuevo contectado!");
});

app.post("/api/msg", (req, res) => {
  console.log(req.body.msg);
  io.emit(req.body.canal, `${req.body.user}: ${req.body.msg}`);
});

server.listen(process.env.PORT, () => {
  console.clear();
  console.log(`${"Server".yellow} ${"running ... =>".blue} ${"OK!".red}`);
});
