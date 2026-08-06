import mongoose from "mongoose";
import { ACTIVE_STATUSES, WEBSITE_KEYS } from "../utils/constants.js";
import slugify from "../utils/slugify.js";

const awardCertificationSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["award", "certification"],
      required: [true, "Type is required"],
      default: "award"
    },
    issuer: {
      type: String,
      trim: true
    },
    certificateNumber: {
      type: String,
      trim: true
    },
    issueDate: Date,
    expiryDate: Date,
    shortDescription: String,
    description: String,
    image: String,
    documentUrl: String,
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

awardCertificationSchema.index({ websiteKey: 1, slug: 1 }, { unique: true });

awardCertificationSchema.pre("validate", function setSlug(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  if (this.slug) this.slug = slugify(this.slug);
  next();
});

export default mongoose.model("AwardCertification", awardCertificationSchema);
