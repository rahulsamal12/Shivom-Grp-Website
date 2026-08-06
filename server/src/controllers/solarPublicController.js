import SolarProduct from "../models/SolarProduct.js";
import SolarPromotion from "../models/SolarPromotion.js";
import Website from "../models/Website.js";
import { successResponse } from "../utils/apiResponse.js";

const ordered = { order: 1, createdAt: -1 };

const ensureSolarWebsite = async () => {
  const website = await Website.findOne({ websiteKey: "solar", status: "active" });
  if (!website) {
    const error = new Error("Solar website not found or inactive");
    error.statusCode = 404;
    throw error;
  }
  return website;
};

const activePromotionQuery = (now = new Date()) => ({
  websiteKey: "solar",
  status: "active",
  $and: [
    { $or: [{ startDate: { $exists: false } }, { startDate: null }, { startDate: { $lte: now } }] },
    { $or: [{ endDate: { $exists: false } }, { endDate: null }, { endDate: { $gte: now } }] }
  ]
});

export const listSolarProducts = async (req, res, next) => {
  try {
    await ensureSolarWebsite();
    const query = { websiteKey: "solar", status: "active" };
    if (req.query.category) query.category = req.query.category;
    const items = await SolarProduct.find(query).sort(ordered);
    successResponse(res, "Solar products fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listFeaturedSolarProducts = async (req, res, next) => {
  try {
    await ensureSolarWebsite();
    const items = await SolarProduct.find({
      websiteKey: "solar",
      status: "active",
      isFeatured: true
    }).sort(ordered);
    successResponse(res, "Featured solar products fetched", items);
  } catch (error) {
    next(error);
  }
};

export const getSolarProductBySlug = async (req, res, next) => {
  try {
    await ensureSolarWebsite();
    const item = await SolarProduct.findOne({
      websiteKey: "solar",
      slug: req.params.slug,
      status: "active"
    });
    if (!item) {
      res.status(404);
      throw new Error("Solar product not found");
    }
    successResponse(res, "Solar product fetched", item);
  } catch (error) {
    next(error);
  }
};

export const listSolarPromotions = async (req, res, next) => {
  try {
    await ensureSolarWebsite();
    const items = await SolarPromotion.find(activePromotionQuery()).sort(ordered);
    successResponse(res, "Solar promotions fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listActiveSolarPromotions = listSolarPromotions;
