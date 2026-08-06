import mongoose from "mongoose";
import { ACTIVE_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";
import slugify from "../utils/slugify.js";

const projectSchema = new mongoose.Schema(
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
    category: String,
    location: String,
    clientName: String,
    projectDate: Date,
    featuredImage: String,
    gallery: [String],
    status: {
      type: String,
      enum: ACTIVE_STATUSES,
      default: "active"
    },
    isFeatured: {
      type: Boolean,
      default: false
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

projectSchema.index({ websiteKey: 1, slug: 1 }, { unique: true });

projectSchema.pre("validate", function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  if (this.slug) this.slug = slugify(this.slug);
  next();
});

export default mongoose.model("Project", projectSchema);
