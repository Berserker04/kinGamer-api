const Person = require("./model");

const add = async (data) => {
  let newPerson = new Person(data);
  return await newPerson.save({ new: true });
};

const edit = async (filter = {}, data = {}) => {
  delete data._id
  return await Person.updateOne(filter, data);
};

const del = async (_id) => {
  return await Person.deleteOne({ _id })
}

module.exports = {
  add,
  edit,
  del
};
