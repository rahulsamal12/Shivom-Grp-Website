import slugify from "../utils/slugify.js";
import { successResponse } from "../utils/apiResponse.js";

const buildQuery = (req, extraFilter = {}) => {
  const query = { ...extraFilter };
  const allowed = ["websiteKey", "status", "category", "type", "isFeatured", "showPrice", "jobType", "adType", "promotionType"];

  allowed.forEach((key) => {
    if (req.query[key] !== undefined && req.query[key] !== "") {
      query[key] = ["isFeatured", "showPrice"].includes(key) ? req.query[key] === "true" : req.query[key];
    }
  });

  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: "i" } },
      { subtitle: { $regex: req.query.search, $options: "i" } },
      { jobTitle: { $regex: req.query.search, $options: "i" } },
      { applicantName: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
      { name: { $regex: req.query.search, $options: "i" } },
      { clientName: { $regex: req.query.search, $options: "i" } },
      { websiteName: { $regex: req.query.search, $options: "i" } },
      { brand: { $regex: req.query.search, $options: "i" } },
      { modelNumber: { $regex: req.query.search, $options: "i" } },
      { heading: { $regex: req.query.search, $options: "i" } },
      { internalName: { $regex: req.query.search, $options: "i" } }
    ];
  }

  return query;
};

const normalizePayload = (body) => {
  const payload = { ...body };
  ["gallery", "tags", "responsibilities", "requirements", "skills", "features", "displayPages", "specifications", "highlights"].forEach((key) => {
    if (typeof payload[key] === "string") {
      const trimmed = payload[key].trim();
      if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
        try {
          payload[key] = JSON.parse(trimmed);
        } catch {
          payload[key] = [];
        }
      } else {
        payload[key] = payload[key]
          .split(/\r?\n|,/)
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }
  });
  return payload;
};

export const createCrudController = (Model, resourceName, options = {}) => ({
  list: async (req, res, next) => {
    try {
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 200);
      const skip = (page - 1) * limit;
      const query = buildQuery(req, options.extraFilter || {});
      const [items, total] = await Promise.all([
        Model.find(query).sort(options.sort || { order: 1, createdAt: -1 }).skip(skip).limit(limit),
        Model.countDocuments(query)
      ]);

      successResponse(res, `${resourceName} fetched`, {
        items,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 }
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const payload = normalizePayload(req.body);
      if (options.hasSlug && !payload.slug && (payload.title || payload.jobTitle)) payload.slug = slugify(payload.title || payload.jobTitle);
      if (options.forceWebsiteKey) payload.websiteKey = options.forceWebsiteKey;
      const created = await Model.create(payload);
      successResponse(res, `${resourceName} created`, created, 201);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      successResponse(res, `${resourceName} fetched`, item);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const payload = normalizePayload(req.body);
      if (options.hasSlug && payload.slug) payload.slug = slugify(payload.slug);
      if (options.hasSlug && !payload.slug && (payload.title || payload.jobTitle)) payload.slug = slugify(payload.title || payload.jobTitle);
      if (options.forceWebsiteKey) payload.websiteKey = options.forceWebsiteKey;

      const updated = await Model.findByIdAndUpdate(req.params.id, payload, {
        new: true,
        runValidators: true
      });

      if (!updated) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }

      successResponse(res, `${resourceName} updated`, updated);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req, res, next) => {
    try {
      const deleted = await Model.findByIdAndDelete(req.params.id);
      if (!deleted) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }
      successResponse(res, `${resourceName} deleted`, { id: req.params.id });
    } catch (error) {
      next(error);
    }
  },

  patchStatus: async (req, res, next) => {
    try {
      const updated = await Model.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      );

      if (!updated) {
        res.status(404);
        throw new Error(`${resourceName} not found`);
      }

      successResponse(res, `${resourceName} status updated`, updated);
    } catch (error) {
      next(error);
    }
  }
});
