//multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});
const fileFilter = (req, file, cb) => {
  // reject
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/avif" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/svg" ||
    file.mimetype === "image/tiff"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 500,
  },
  fileFilter,
});

module.exports = upload;
