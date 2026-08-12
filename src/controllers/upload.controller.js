const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/aws");
const path = require("path");

const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME || "sshomestaybucket-sshome";
    const region = process.env.AWS_REGION || "eu-north-1";

    const timeStamp = Date.now();
    const randomHash = Math.random().toString(36).substring(2, 10);
    const sanitizedOriginal = path
      .basename(req.file.originalname, path.extname(req.file.originalname))
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    const ext = path.extname(req.file.originalname).toLowerCase() || ".webp";
    const key = `uploads/${sanitizedOriginal}-${timeStamp}-${randomHash}${ext}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    await s3Client.send(command);
    const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully to AWS S3",
      data: {
        key,
        url: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype,
        storage: "s3",
      },
    });
  } catch (error) {
    console.error("AWS S3 Upload Error:", error);
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { key } = req.body;
    if (!key) {
      return res.status(400).json({
        success: false,
        message: "S3 object key is required for deletion",
      });
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME || "sshomestaybucket-sshome";

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(command);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully from AWS S3",
    });
  } catch (error) {
    console.error("AWS S3 Delete Error:", error);
    next(error);
  }
};

module.exports = {
  uploadFile,
  deleteFile,
};


