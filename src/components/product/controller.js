const store = require("./store");

const register = async (data) => {
  if (!data) return false;

  return await store
    .add(data)
    .then((result) => result)
    .catch((e) => false);
};

module.exports = {
  register,
};
