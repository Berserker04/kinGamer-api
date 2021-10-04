const base64Img = require("base64-img");
const slug = require("slug");
const bcrypt = require("bcrypt");

const saveImage = (image, name) => {
  const destpath = "src/uploads/images";
  const filename = bcrypt.hashSync(name, 5);

  base64Img.img(image, destpath, filename, (err, filepath) => {});
  return filename + ".jpg";
};

module.exports = saveImage;
