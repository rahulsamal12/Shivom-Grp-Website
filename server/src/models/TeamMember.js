import mongoose from "mongoose";
import { ACTIVE_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const teamMemberSchema = new mongoose.Schema(
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
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true
    },
    department: String,
    bio: String,
    image: String,
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [emailRegex, "Please provide a valid email"]
    },
    phone: String,
    linkedin: String,
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

export default mongoose.model("TeamMember", teamMemberSchema);
