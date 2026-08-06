import mongoose from "mongoose";
import { ACTIVE_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const websiteSchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: WEBSITE_KEYS,
      required: [true, "Website key is required"],
      unique: true
    },
    websiteName: {
      type: String,
      required: [true, "Website name is required"],
      trim: true
    },
    logo: String,
    favicon: String,
    primaryColor: {
      type: String,
      default: "#0f766e"
    },
    secondaryColor: {
      type: String,
      default: "#1f2937"
    },
    metaTitle: String,
    metaDescription: String,
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [emailRegex, "Please provide a valid contact email"]
    },
    contactPhone: String,
    address: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      linkedin: String,
      twitter: String,
      youtube: String
    },
    status: {
      type: String,
      enum: ACTIVE_STATUSES,
      default: "active"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Website", websiteSchema);
