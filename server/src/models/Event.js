import mongoose from "mongoose";
import { ACTIVE_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";
import slugify from "../utils/slugify.js";

const eventSchema = new mongoose.Schema(
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
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    shortDescription: String,
    description: String,
    eventDate: Date,
    location: String,
    featuredImage: String,
    gallery: [String],
    status: {
      type: String,
      enum: ACTIVE_STATUSES,
      default: "active"
    },
    order: {
      type: Number,
      default: 0
    },
    metaTitle: String,
    metaDescription: String
  },
  { timestamps: true }
);

eventSchema.index({ websiteKey: 1, slug: 1 }, { unique: true });

eventSchema.pre("validate", function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  if (this.slug) this.slug = slugify(this.slug);
  next();
});

export default mongoose.model("Event", eventSchema);
