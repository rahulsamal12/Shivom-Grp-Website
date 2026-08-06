import mongoose from "mongoose";
import { ACTIVE_STATUSES } from "../utils/constants.js";
import slugify from "../utils/slugify.js";

const pageSectionSchema = new mongoose.Schema(
  {
    sectionKey: {
      type: String,
      required: [true, "Section key is required"],
      trim: true
    },
    heading: String,
    subHeading: String,
    description: String,
    image: String,
    buttonText: String,
    buttonLink: String,
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
  { _id: true }
);

const pageSchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: ["group"],
      default: "group",
      required: [true, "Website key is required"]
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      lowercase: true,
      trim: true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },
    metaTitle: String,
    metaDescription: String,
    bannerImage: String,
    sections: [pageSectionSchema],
    status: {
      type: String,
      enum: ACTIVE_STATUSES,
      default: "active"
    }
  },
  { timestamps: true }
);

pageSchema.index({ websiteKey: 1, slug: 1 }, { unique: true });

pageSchema.pre("validate", function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  if (this.slug) this.slug = slugify(this.slug);
  next();
});

export default mongoose.model("Page", pageSchema);
