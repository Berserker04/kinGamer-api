const base64Img = require("base64-img");
const slug = require("slug");
const moment = require("moment");

const saveImage = (image, name) => {
  const time = moment().format("YYYYMMDDhmmss");
  const destpath = "src/uploads/images";
  const filename = slug(name, "_") + time;

  base64Img.img(image, destpath, filename, (err, filepath) => {});
  let type = image.split(";")[0].split("/")[1];
  if (type === "jpeg") type = "jpg";
  return filename + "." + type;
};

module.exports = saveImage;
