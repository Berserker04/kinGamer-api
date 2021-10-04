const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path")

require("./config");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, '../public')));

const route = require("./network");
route(app);


app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`${"Server".yellow} ${"running ... =>".blue} ${"OK!".red}`);
});
