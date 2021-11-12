const Chat = require("./model");

const add = async (data) => {
  let newChat = new Chat(data);
  return await newChat.save({ new: true });
};

const get = async (filter = {}) => {
  console.log(filter);
  return await Chat.find(filter).populate("users").sort({ _id: -1 });
  // .exec((err, populated) => {
  //   console.log(populated);
  //   if (err) return false;
  //   return populated;
  // });
};

const edit = async (_id, data = {}) => {
  return await Chat.updateOne({ _id }, data);
};

const del = async (_id) => {
  return await Chat.deleteOne({ _id });
};

module.exports = {
  add,
  get,
  edit,
  del,
};
