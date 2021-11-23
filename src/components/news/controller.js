const saveImage = require("../files/saveImage");
const store = require("./store");
var slug = require('slug')
var print = console.log.bind(console, '>')

const register = async (data) => {
  if (!data) {
    return false;
  }
  const { image, title } = data;
  if (image) data.image = saveImage(image, title);

  data.slug = slug(data.title)

  return await store
    .add(data)
    .then((result) => result)
    .catch((e) => false);
};

const search = async (filter) => {
  return await store.get(filter).catch((e) => false);
};

const update = async (report_id, data) => {
  if (!data) {
    return false;
  }
  const { image, title } = data;
  if (image) data.image = saveImage(image, title);
  data.slug = slug(data.title)
  return await store
    .edit(report_id, data)
    .then((result) => result)
    .catch((e) => false);
};

const remove = async (report_id) => {
  return await store.del(report_id).catch((e) => false);
};

module.exports = {
  register,
  search,
  update,
  remove,
};
