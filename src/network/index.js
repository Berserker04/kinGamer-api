const product = require("../components/product/network");

const user = require("../components/user/network");
const people = require("../components/people/network");
const auth = require("../components/auth/network");
const news = require("../components/news/network");

const path = require("path");

const route = (app) => {
  app.use("/api/product", product);
  app.use("/api/user", user);
  app.use("/api/people", people);
  app.use("/api/login", auth);
  app.use("/api/news", news);

  app.get("/api/load/image/:image", (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, `../uploads/images/${req.params.image}`));
  });

  // app.get("/", (req, res) => {
  //   res.send(`Server running ... => OK!`);
  // });
};

module.exports = route;
