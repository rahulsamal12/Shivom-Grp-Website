import mongoose from "mongoose";
import { BLOG_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";
import slugify from "../utils/slugify.js";

const blogSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true
    },
    featuredImage: String,
    category: String,
    tags: [String],
    author: String,
    publishDate: Date,
    status: {
      type: String,
      enum: BLOG_STATUSES,
      default: "draft"
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    metaTitle: String,
    metaDescription: String
  },
  { timestamps: true }
);

blogSchema.index({ websiteKey: 1, slug: 1 }, { unique: true });

blogSchema.pre("validate", function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  if (this.slug) this.slug = slugify(this.slug);
  next();
});

export default mongoose.model("Blog", blogSchema);
