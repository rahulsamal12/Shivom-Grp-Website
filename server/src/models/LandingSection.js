import mongoose from "mongoose";
import { ACTIVE_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";

const itemSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    icon: String,
    image: String,
    link: String
  },
  { _id: true }
);

const landingSectionSchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: WEBSITE_KEYS.filter((key) => key !== "group"),
      required: [true, "Website key is required"],
      index: true
    },
    sectionType: {
      type: String,
      required: [true, "Section type is required"],
      trim: true
    },
    heading: {
      type: String,
      required: [true, "Heading is required"],
      trim: true
    },
    subHeading: String,
    description: String,
    image: String,
    items: [itemSchema],
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

landingSectionSchema.index({ websiteKey: 1, sectionType: 1, order: 1 });

export default mongoose.model("LandingSection", landingSectionSchema);
