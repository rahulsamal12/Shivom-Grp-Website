import mongoose from "mongoose";
import { CAREER_STATUSES, JOB_TYPES, WEBSITE_KEYS } from "../utils/constants.js";
import slugify from "../utils/slugify.js";

const stringList = {
  type: [String],
  default: []
};

const careerSchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: WEBSITE_KEYS,
      required: [true, "Website key is required"],
      index: true
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true
    },
    department: {
      type: String,
      trim: true
    },
    jobType: {
      type: String,
      enum: JOB_TYPES,
      default: "full-time",
      required: [true, "Job type is required"]
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true
    },
    experience: {
      type: String,
      trim: true
    },
    salaryRange: {
      type: String,
      trim: true
    },
    shortDescription: String,
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    responsibilities: stringList,
    requirements: stringList,
    skills: stringList,
    applicationDeadline: Date,
    applyEmail: {
      type: String,
      trim: true,
      lowercase: true
    },
    applyLink: String,
    status: {
      type: String,
      enum: CAREER_STATUSES,
      default: "active",
      index: true
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

careerSchema.index({ websiteKey: 1, slug: 1 }, { unique: true });

careerSchema.pre("validate", function setSlug(next) {
  if (!this.slug && this.jobTitle) this.slug = slugify(this.jobTitle);
  if (this.slug) this.slug = slugify(this.slug);
  next();
});

export default mongoose.model("Career", careerSchema);
