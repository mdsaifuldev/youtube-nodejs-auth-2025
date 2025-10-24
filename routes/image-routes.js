const authmiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const { uploadImageController } = require("../controllers/image-controller");

const express = require("express");

const router = express.Router();

// upload the image
router.post(
  "/upload",
  authmiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);

// get all the images

module.exports = router;
