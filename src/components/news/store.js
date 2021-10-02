const News = require("./model");

const add = async (data) => {
  let newReport = new News(data);
  return await newReport.save({ new: true });
};

const get = async (filter = {}) => {
  return await News.find(filter);
};

const edit = async (_id, data = {}) => {
  return await News.updateOne({ _id }, data);
};

const del = async (_id) => {
  return await News.deleteOne({ _id });
};

module.exports = {
  add,
  get,
  edit,
  del,
};
