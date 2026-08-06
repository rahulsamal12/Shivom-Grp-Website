import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { successResponse } from "../utils/apiResponse.js";

const canUseCloudinary = () =>
  process.env.UPLOAD_MODE === "cloudinary" &&
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

const getPublicApiOrigin = (req) => {
  const configuredOrigin = process.env.PUBLIC_API_URL || process.env.API_BASE_URL;
  if (configuredOrigin) {
    return configuredOrigin.replace(/\/api\/?$/, "").replace(/\/$/, "");
  }
  return `${req.protocol}://${req.get("host")}`;
};

const toPublicUrl = (req, file) => `${getPublicApiOrigin(req)}/uploads/${file.filename}`;

const uploadToCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const result = await cloudinary.uploader.upload(file.path, {
    folder: process.env.CLOUDINARY_FOLDER || "group-cms"
  });
  fs.unlink(file.path, () => {});
  return result.secure_url;
};

const mapFile = async (req, file) => ({
  originalName: file.originalname,
  mimeType: file.mimetype,
  size: file.size,
  url: canUseCloudinary() ? await uploadToCloudinary(file) : toPublicUrl(req, file)
});

export const uploadSingle = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(422);
      throw new Error("Image file is required");
    }
    const file = await mapFile(req, req.file);
    successResponse(res, "Image uploaded", file, 201);
  } catch (error) {
    next(error);
  }
};

export const uploadMultiple = async (req, res, next) => {
  try {
    if (!req.files?.length) {
      res.status(422);
      throw new Error("At least one image file is required");
    }
    const files = await Promise.all(req.files.map((file) => mapFile(req, file)));
    successResponse(res, "Images uploaded", files, 201);
  } catch (error) {
    next(error);
  }
};
