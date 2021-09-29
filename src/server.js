const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("./config");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const route = require("./network/routes");
route(app);

app.listen(3001, () => {
  console.clear();
  console.log("Server running in port 3001 http://localhost:3001/");
});
