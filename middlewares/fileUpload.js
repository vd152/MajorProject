const multer = require("multer");
const fs = require("fs");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/bmp": "bmp",
  "image/gif": "gif",
  "image/vnd.microsoft.icon": "icon",
  "image/svg+xml": "svg",
  "image/tiff": "tiff",
  "image/tiff": "tif",
  "image/webp": "webp",
  "video/x-msvideo": "avi",
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "video/ogg": "ogv",
  "video/webm": "webm",
  "video/3gpp": "3g2",
  "video/3gpp": "3gp",
  "application/pdf": "pdf",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const path = `./data/uploads/${req.params.doodleName}`;
      fs.mkdirSync(path, { recursive: true });
      return cb(null, path);
      //cb(null, `data/uploads/${req.params.doodleName}`);
    },
    filename: (req, file, cb) => {
      //const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, req.params.doodleName + "-" + Date.now() + ".png");
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
