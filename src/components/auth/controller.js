const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const store = require("./store");

const login = async (data) => {
  let { password, user_name } = data;
  // password = bcrypt.hashSync(password, 10)
  // console.log(password);

  let users = await store.get(user_name).catch((e) => false);
  
  if (users) {
    if (!(users.length > 0)) {
      return false;
    }

    let user = users[0];
    if (!bcrypt.compareSync(password || "", user.password)) {
      return false;
    }

    user.password = undefined;

    let token = jwt.sign(
      {
        login: user,
      },
      process.env.SEED,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    return {
      token,
      user,
    };
  } else {
    return false;
  }
};

const validateToken = async (token) => {
  if (!token) return false;
  let usuario = null;
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (!err) {
      usuario = decoded;
    }
  });

  if (!usuario) return false;
  var Today = Math.round(new Date().getTime() / 1000);

  const { exp } = usuario;
  if (Today < exp) {
    return { user: usuario.login };
  }
  return {
    user: {},
  };
};

module.exports = {
  login,
  validateToken,
};
