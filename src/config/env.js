require("dotenv").config();

const env = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "sshomestays_jwt_secret_key_2026",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  aws: {
    region: process.env.AWS_REGION || "eu-north-1",
    s3Bucket: process.env.AWS_S3_BUCKET_NAME || "sshomestaybucket-sshome",
  },
};

module.exports = env;