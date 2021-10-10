const Product = require("./model");

const add = async (data) => {
  let newReport = new Product(data);
  return await newReport.save({ new: true });
};

const get = async (filter = {}) => {
  return await Product.find(filter).sort({_id: -1})
};

const edit = async (_id, data = {}) => {
  return await Product.updateOne({ _id }, data);
};

const del = async (_id) => {
  return await Product.deleteOne({ _id });
};

module.exports = {
  add,
  get,
  edit,
  del,
};
