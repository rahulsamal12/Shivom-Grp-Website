import mongoose from "mongoose";
import slugify from "../utils/slugify.js";
import { ACTIVE_STATUSES, SOLAR_PRODUCT_CATEGORIES } from "../utils/constants.js";

const specificationSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, "Specification label is required"],
      trim: true
    },
    value: {
      type: String,
      required: [true, "Specification value is required"],
      trim: true
    }
  },
  { _id: false }
);

const solarProductSchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: ["solar"],
      default: "solar",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      index: true
    },
    category: {
      type: String,
      enum: SOLAR_PRODUCT_CATEGORIES,
      required: [true, "Product category is required"],
      index: true
    },
    brand: String,
    modelNumber: String,
    shortDescription: String,
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    featuredImage: String,
    gallery: {
      type: [String],
      default: []
    },
    badge: String,
    specifications: {
      type: [specificationSchema],
      default: []
    },
    features: {
      type: [String],
      default: []
    },
    price: Number,
    priceLabel: String,
    showPrice: {
      type: Boolean,
      default: false
    },
    ctaText: String,
    ctaLink: String,
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    },
    order: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ACTIVE_STATUSES,
      default: "active",
      index: true
    },
    metaTitle: String,
    metaDescription: String
  },
  { timestamps: true }
);

solarProductSchema.pre("validate", function setSlug(next) {
  this.websiteKey = "solar";
  if (!this.slug && this.title) this.slug = slugify(this.title);
  if (this.slug) this.slug = slugify(this.slug);
  next();
});

export default mongoose.model("SolarProduct", solarProductSchema);
