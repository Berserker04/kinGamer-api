const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");

require("./config");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const route = require("./network");
route(app);

app.listen(3001, () => {
  console.clear();
  console.log(`${"Server".yellow} ${"running ... =>".blue} ${"OK!".red}`);
});
