import fs from "fs";
import path from "path";
import CareerApplication from "../models/CareerApplication.js";
import { CAREER_APPLICATION_STATUSES, INTERVIEW_MODES } from "../utils/constants.js";
import { successResponse } from "../utils/apiResponse.js";
import { resumeUploadRoot } from "../middleware/uploadMiddleware.js";

const ADMIN_FIELDS = ["adminRemarks", "rejectionReason", "interviewDate", "interviewMode", "interviewLink"];

const buildResumeUrls = (id) => ({
  resumeViewUrl: `/api/admin/career-applications/${id}/resume/view`,
  resumeDownloadUrl: `/api/admin/career-applications/${id}/resume/download`
});

const toAdminDto = (application) => {
  const item = typeof application.toObject === "function" ? application.toObject() : application;
  return {
    ...item,
    ...buildResumeUrls(item._id),
    resumePath: undefined
  };
};

const buildQuery = (req) => {
  const query = {};
  ["websiteKey", "careerId", "status"].forEach((key) => {
    if (req.query[key]) query[key] = req.query[key];
  });

  if (req.query.fromDate || req.query.toDate) {
    query.createdAt = {};
    if (req.query.fromDate) query.createdAt.$gte = new Date(req.query.fromDate);
    if (req.query.toDate) {
      const toDate = new Date(req.query.toDate);
      toDate.setHours(23, 59, 59, 999);
      query.createdAt.$lte = toDate;
    }
  }

  if (req.query.search) {
    const search = { $regex: req.query.search, $options: "i" };
    query.$or = [{ applicantName: search }, { email: search }, { phone: search }, { jobTitle: search }];
  }

  return query;
};

const getApplicationOrThrow = async (id) => {
  const item = await CareerApplication.findById(id)
    .populate("careerId", "jobTitle slug department jobType location experience salaryRange")
    .populate("reviewedBy", "name email")
    .populate("actionHistory.performedBy", "name email");
  if (!item) {
    const error = new Error("Career application not found");
    error.statusCode = 404;
    throw error;
  }
  return item;
};

const resolveResumePath = (application) => {
  if (!application.resumePath) return null;
  const absolutePath = path.resolve(application.resumePath);
  const allowedRoot = path.resolve(resumeUploadRoot);
  if (!absolutePath.startsWith(allowedRoot + path.sep) && absolutePath !== allowedRoot) return null;
  return absolutePath;
};

const safeDownloadName = (application) => {
  const ext = path.extname(application.resumeOriginalName || "") || ".pdf";
  const base = path
    .basename(application.resumeOriginalName || `${application.applicantName || "resume"}${ext}`, ext)
    .replace(/[^a-zA-Z0-9-_ ]+/g, "")
    .trim()
    .replace(/\s+/g, "-") || "resume";
  return `${base}${ext.toLowerCase()}`;
};

export const careerApplicationController = {
  list: async (req, res, next) => {
    try {
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
      const skip = (page - 1) * limit;
      const query = buildQuery(req);

      const [items, total] = await Promise.all([
        CareerApplication.find(query)
          .populate("careerId", "department jobType location")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        CareerApplication.countDocuments(query)
      ]);

      successResponse(res, "Career applications fetched", {
        items: items.map(toAdminDto),
        pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 }
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      res.status(405);
      throw new Error("Create applications from the public career apply API");
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const item = await getApplicationOrThrow(req.params.id);
      successResponse(res, "Career application fetched", toAdminDto(item));
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const payload = {};
      ADMIN_FIELDS.forEach((field) => {
        if (req.body[field] !== undefined) payload[field] = req.body[field] || undefined;
      });
      if (payload.interviewMode && !INTERVIEW_MODES.includes(payload.interviewMode)) {
        res.status(422);
        throw new Error("Invalid interview mode");
      }

      const item = await CareerApplication.findByIdAndUpdate(req.params.id, payload, {
        new: true,
        runValidators: true
      });
      if (!item) {
        res.status(404);
        throw new Error("Career application not found");
      }
      successResponse(res, "Career application updated", toAdminDto(item));
    } catch (error) {
      next(error);
    }
  },

  patchStatus: async (req, res, next) => {
    try {
      const { status, adminRemarks, rejectionReason, interviewDate, interviewMode, interviewLink } = req.body;
      if (!CAREER_APPLICATION_STATUSES.includes(status)) {
        res.status(422);
        throw new Error("Invalid application status");
      }
      if (interviewMode && !INTERVIEW_MODES.includes(interviewMode)) {
        res.status(422);
        throw new Error("Invalid interview mode");
      }

      const item = await CareerApplication.findById(req.params.id);
      if (!item) {
        res.status(404);
        throw new Error("Career application not found");
      }

      const oldStatus = item.status;
      item.status = status;
      item.adminRemarks = adminRemarks ?? item.adminRemarks;
      item.rejectionReason = rejectionReason ?? item.rejectionReason;
      item.interviewDate = interviewDate || undefined;
      item.interviewMode = interviewMode || undefined;
      item.interviewLink = interviewLink || undefined;
      item.reviewedBy = req.admin?._id;
      item.reviewedAt = new Date();
      item.actionHistory.push({
        action: "status_update",
        oldStatus,
        newStatus: status,
        remarks: adminRemarks || rejectionReason || "",
        performedBy: req.admin?._id,
        performedAt: new Date()
      });
      await item.save();
      await item.populate("reviewedBy", "name email");
      await item.populate("actionHistory.performedBy", "name email");
      successResponse(res, "Career application status updated", toAdminDto(item));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req, res, next) => {
    try {
      const item = await CareerApplication.findByIdAndDelete(req.params.id);
      if (!item) {
        res.status(404);
        throw new Error("Career application not found");
      }

      const resumePath = resolveResumePath(item);
      if (resumePath && fs.existsSync(resumePath)) {
        fs.unlinkSync(resumePath);
      }

      successResponse(res, "Career application deleted", { id: req.params.id });
    } catch (error) {
      next(error);
    }
  },

  viewResume: async (req, res, next) => {
    try {
      const item = await getApplicationOrThrow(req.params.id);
      const resumePath = resolveResumePath(item);
      if (!resumePath || !fs.existsSync(resumePath)) {
        res.status(404);
        throw new Error("Resume file not found in protected storage");
      }

      const filename = safeDownloadName(item);
      if (item.resumeMimeType === "application/pdf") {
        res.setHeader("Content-Type", item.resumeMimeType);
        res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
        return res.sendFile(resumePath);
      }
      return res.download(resumePath, filename);
    } catch (error) {
      next(error);
    }
  },

  downloadResume: async (req, res, next) => {
    try {
      const item = await getApplicationOrThrow(req.params.id);
      const resumePath = resolveResumePath(item);
      if (!resumePath || !fs.existsSync(resumePath)) {
        res.status(404);
        throw new Error("Resume file not found in protected storage");
      }
      return res.download(resumePath, safeDownloadName(item));
    } catch (error) {
      next(error);
    }
  }
};
