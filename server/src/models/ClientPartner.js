import mongoose from "mongoose";
import { ACTIVE_STATUSES, CLIENT_PARTNER_TYPES, WEBSITE_KEYS } from "../utils/constants.js";

const clientPartnerSchema = new mongoose.Schema(
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
    logo: {
      type: String,
      required: [true, "Logo is required"]
    },
    websiteUrl: {
      type: String,
      trim: true
    },
    description: String,
    type: {
      type: String,
      enum: CLIENT_PARTNER_TYPES,
      default: "client",
      required: [true, "Type is required"],
      index: true
    },
    order: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ACTIVE_STATUSES,
      default: "active",
      index: true
    }
  },
  { timestamps: true }
);

clientPartnerSchema.index({ websiteKey: 1, type: 1, status: 1, order: 1 });

export default mongoose.model("ClientPartner", clientPartnerSchema);
