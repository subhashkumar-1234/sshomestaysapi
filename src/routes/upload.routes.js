const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const uploadController = require("../controllers/upload.controller");

/**
 * @openapi
 * tags:
 *   name: Upload
 *   description: AWS S3 File Upload and Delete API
 */

/**
 * @openapi
 * /api/upload:
 *   post:
 *     summary: Upload single image file to AWS S3 bucket
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload (JPEG, PNG, WebP, etc.)
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UploadResponse'
 *       400:
 *         description: No image file provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  "/",
  upload.single("image"),
  uploadController.uploadFile
);

/**
 * @openapi
 * /api/upload:
 *   delete:
 *     summary: Delete file from AWS S3 bucket by object key
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteUploadInput'
 *     responses:
 *       200:
 *         description: Image deleted successfully from AWS S3
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "Image deleted successfully from AWS S3" }
 *       400:
 *         description: S3 object key missing
 */
router.delete(
  "/",
  uploadController.deleteFile
);

module.exports = router;

