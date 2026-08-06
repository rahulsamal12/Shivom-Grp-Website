import mongoose from "mongoose";
import { ACTIVE_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";

const sliderSchema = new mongoose.Schema(
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
    buttonText: String,
    buttonLink: String,
    image: {
      type: String,
      required: [true, "Image is required"]
    },
    mobileImage: String,
    order: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ACTIVE_STATUSES,
      default: "active"
    }
  },
  { timestamps: true }
);

sliderSchema.index({ websiteKey: 1, order: 1 });

export default mongoose.model("Slider", sliderSchema);
