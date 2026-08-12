const multer = require("multer");
const path = require("path");

// Memory storage for streaming direct uploads to AWS S3
const storage = multer.memoryStorage();

// Strict File Type Validation
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|svg|gif/;
  const extName = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = allowedExtensions.test(file.mimetype.toLowerCase());

  if (extName && mimeType) {
    return cb(null, true);
  }

  return cb(
    new Error("Invalid file format. Only JPEG, JPG, PNG, WEBP, and SVG images are permitted.")
  );
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size limit
  fileFilter: fileFilter,
});

module.exports = upload;
