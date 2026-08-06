import mongoose from "mongoose";
import { CONTACT_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactEnquirySchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: WEBSITE_KEYS,
      required: [true, "Website key is required"],
      index: true
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [emailRegex, "Please provide a valid email"]
    },
    phone: String,
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true
    },
    sourcePage: String,
    enquiryType: {
      type: String,
      enum: ["general", "product", "scheme"],
      default: "general"
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SolarProduct"
    },
    productTitle: String,
    promotionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SolarPromotion"
    },
    promotionTitle: String,
    sourceSection: String,
    status: {
      type: String,
      enum: CONTACT_STATUSES,
      default: "new"
    }
  },
  { timestamps: true }
);

export default mongoose.model("ContactEnquiry", contactEnquirySchema);
