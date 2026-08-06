import mongoose from "mongoose";
import { ACTIVE_STATUSES, AD_TYPES, WEBSITE_KEYS } from "../utils/constants.js";

const advertisementSchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: WEBSITE_KEYS,
      required: [true, "Website key is required"],
      index: true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    subtitle: String,
    description: String,
    adType: {
      type: String,
      enum: AD_TYPES,
      required: [true, "Advertisement type is required"],
      default: "popup",
      index: true
    },
    image: String,
    buttonText: String,
    buttonLink: String,
    startDate: Date,
    endDate: Date,
    displayPages: {
      type: [String],
      default: []
    },
    targetUrl: String,
    openInNewTab: {
      type: Boolean,
      default: false
    },
    priority: {
      type: Number,
      default: 0,
      index: true
    },
    status: {
      type: String,
      enum: ACTIVE_STATUSES,
      default: "active",
      index: true
    },
    showOnce: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Advertisement", advertisementSchema);
