const multerConfig = require("multer");
const diskStorage = multerConfig.diskStorage;
const path = require("path");
const join = path.join;
const dirname = path.dirname;
const url = require("url");
const fileURLToPath = url.fileURLToPath;

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

export default function (image, size) {
  return multer({
    storage: diskStorage({
      destination: (req, file, callback) => {
        //C:\Users\yassi\Desktop\node\4sim1\workshop-gse-gamix2122\middlewares
        //C:\Users\yassi\Desktop\node\4sim4\exercice_s4\models\game.js
        const __dirname = dirname(fileURLToPath(import.meta.url));
        callback(null, join(__dirname, "../public/images"));
      },
      filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        let newFileName = +new Date() +  extname(file.originalname);
        callback(null, newFileName);
      },
    }),
    limits: size,
  }).single(image);
}
