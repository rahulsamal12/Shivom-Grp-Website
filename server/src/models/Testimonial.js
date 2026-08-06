import mongoose from "mongoose";
import { ACTIVE_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";

const testimonialSchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: WEBSITE_KEYS,
      required: [true, "Website key is required"],
      index: true
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true
    },
    designation: String,
    companyName: String,
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true
    },
    image: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
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

export default mongoose.model("Testimonial", testimonialSchema);
