import mongoose from "mongoose";
import {
  ACTIVE_STATUSES,
  SOLAR_PROMOTION_BACKGROUND_STYLES,
  SOLAR_PROMOTION_BUTTON_ACTIONS,
  SOLAR_PROMOTION_TYPES
} from "../utils/constants.js";

const highlightSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Highlight text is required"],
      trim: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const solarPromotionSchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: ["solar"],
      default: "solar",
      required: true,
      index: true
    },
    internalName: {
      type: String,
      required: [true, "Internal name is required"],
      trim: true
    },
    promotionType: {
      type: String,
      enum: SOLAR_PROMOTION_TYPES,
      required: [true, "Promotion type is required"],
      index: true
    },
    heading: {
      type: String,
      required: [true, "Heading is required"],
      trim: true
    },
    subHeading: String,
    description: String,
    highlights: {
      type: [highlightSchema],
      default: []
    },
    image: String,
    mobileImage: String,
    imageAlt: String,
    buttonText: String,
    buttonLink: String,
    buttonAction: {
      type: String,
      enum: SOLAR_PROMOTION_BUTTON_ACTIONS,
      default: "link"
    },
    backgroundStyle: {
      type: String,
      enum: SOLAR_PROMOTION_BACKGROUND_STYLES,
      default: "light"
    },
    headingColor: String,
    buttonColor: String,
    order: {
      type: Number,
      default: 0
    },
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ACTIVE_STATUSES,
      default: "active",
      index: true
    }
  },
  { timestamps: true }
);

solarPromotionSchema.index({ websiteKey: 1, promotionType: 1, status: 1, order: 1 });

solarPromotionSchema.pre("validate", function forceSolarWebsite(next) {
  this.websiteKey = "solar";
  next();
});

export default mongoose.model("SolarPromotion", solarPromotionSchema);
