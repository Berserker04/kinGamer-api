const mongoose = require("mongoose");

const url_db = "mongodb://localhost:27017/KinGamer";

mongoose.connect(url_db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
