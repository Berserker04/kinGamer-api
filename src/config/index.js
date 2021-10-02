if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Conexión a la base de datos
const URL_DB = process.env.DB_PROD || process.env.DB_DEV;
const mongoose = require("mongoose");

mongoose.connect(URL_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
