const Message = require("./model");

const add = async (data) => {
  let newMessage = new Message(data);
  return await newMessage.save({ new: true });
};

const get = async (filter = {}) => {
  return await Message.find(filter) //.sort({_id: -1})
};

const edit = async (_id, data = {}) => {
  return await Message.updateOne({ _id }, data);
};

const del = async (_id) => {
  return await Message.deleteOne({ _id });
};

module.exports = {
  add,
  get,
  edit,
  del,
};
