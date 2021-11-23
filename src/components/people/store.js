const Person = require("./model");

const add = async (data) => {
  let newPerson = new Person(data);
  return await newPerson.save({ new: true });
};

const edit = async (filter = {}, data = {}) => {
  delete data._id
  console.log(filter)
  console.log(data)
  return await Person.updateOne(filter, data);
};

module.exports = {
  add,
  edit,
};
