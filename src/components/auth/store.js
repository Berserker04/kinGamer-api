const User = require("../user/model");

const add = async (role) => {
  let newRole = new User(role);
  return await newRole.save({ new: true });
};

const get = async (user_name = {}) => {
  return await User.find({
    $and: [{ state: "active" }, { $or: [{ email: user_name }, { user_name }] }],
  });
};

const edit = async (_id, data = {}) => {
  return await User.updateOne({ _id }, data);
};

const del = async (_id) => {
  return await User.deleteOne({ _id });
};

module.exports = {
  add,
  get,
  edit,
  del,
};
