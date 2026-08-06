import fs from "fs";
import mongoose from "mongoose";
import Website from "../models/Website.js";
import Slider from "../models/Slider.js";
import Page from "../models/Page.js";
import LandingSection from "../models/LandingSection.js";
import Project from "../models/Project.js";
import Testimonial from "../models/Testimonial.js";
import Event from "../models/Event.js";
import TeamMember from "../models/TeamMember.js";
import Blog from "../models/Blog.js";
import ContactEnquiry from "../models/ContactEnquiry.js";
import AwardCertification from "../models/AwardCertification.js";
import Career from "../models/Career.js";
import CareerApplication from "../models/CareerApplication.js";
import Advertisement from "../models/Advertisement.js";
import ClientPartner from "../models/ClientPartner.js";
import { isValidWebsiteKey } from "../utils/constants.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  notifyCareerApplication,
  notifyContactSubmission
} from "../services/emailNotifications.js";

const assertWebsiteKey = (websiteKey) => {
  if (!isValidWebsiteKey(websiteKey)) {
    const error = new Error("Invalid website key");
    error.statusCode = 422;
    throw error;
  }
};

const ensureActiveWebsite = async (websiteKey) => {
  assertWebsiteKey(websiteKey);
  const website = await Website.findOne({ websiteKey, status: "active" });
  if (!website) {
    const error = new Error("Website not found or inactive");
    error.statusCode = 404;
    throw error;
  }
  return website;
};

const ordered = { order: 1, createdAt: -1 };

const awardTypeQuery = (type) => (["award", "certification"].includes(type) ? { type } : {});

const removeUploadedFile = (file) => {
  if (file?.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
};

const duplicateApplicationSince = () => new Date(Date.now() - 24 * 60 * 60 * 1000);

const clientPartnerTypeQuery = (type) => (["client", "partner"].includes(type) ? { type } : {});

const activeAdvertisementQuery = (websiteKey, now = new Date()) => ({
  websiteKey,
  status: "active",
  $and: [
    { $or: [{ startDate: { $exists: false } }, { startDate: null }, { startDate: { $lte: now } }] },
    { $or: [{ endDate: { $exists: false } }, { endDate: null }, { endDate: { $gte: now } }] }
  ]
});

export const getHome = async (req, res, next) => {
  try {
    const { websiteKey } = req.params;
    const website = await ensureActiveWebsite(websiteKey);
    const [
      sliders,
      projects,
      testimonials,
      events,
      awardsCertifications,
      awards,
      certifications,
      team,
      blogs,
      careers,
      advertisements,
      clientPartners,
      landingSections,
      homePage
    ] = await Promise.all([
      Slider.find({ websiteKey, status: "active" }).sort(ordered),
      Project.find({ websiteKey, status: "active", isFeatured: true }).sort(ordered).limit(8),
      Testimonial.find({ websiteKey, status: "active" }).sort(ordered),
      Event.find({ websiteKey, status: "active" }).sort({ eventDate: -1, order: 1 }).limit(6),
      AwardCertification.find({ websiteKey, status: "active", isFeatured: true }).sort(ordered).limit(8),
      AwardCertification.find({ websiteKey, status: "active", type: "award" }).sort(ordered),
      AwardCertification.find({ websiteKey, status: "active", type: "certification" }).sort(ordered),
      TeamMember.find({ websiteKey, status: "active" }).sort(ordered),
      Blog.find({ websiteKey, status: "published", isFeatured: true }).sort({ publishDate: -1 }).limit(6),
      Career.find({ websiteKey, status: "active" }).sort(ordered).limit(6),
      Advertisement.find(activeAdvertisementQuery(websiteKey)).sort({ priority: -1, createdAt: -1 }),
      ClientPartner.find({ websiteKey, status: "active" }).sort(ordered),
      websiteKey === "group" ? [] : LandingSection.find({ websiteKey, status: "active" }).sort(ordered),
      websiteKey === "group" ? Page.findOne({ websiteKey, slug: "home", status: "active" }) : null
    ]);

    successResponse(res, "Home content fetched", {
      website,
      sliders,
      projects,
      testimonials,
      events,
      awardsCertifications,
      awards,
      certifications,
      team,
      blogs,
      careers,
      advertisements,
      clientPartners,
      landingSections,
      page: homePage
    });
  } catch (error) {
    next(error.statusCode ? Object.assign(error, { status: error.statusCode }) : error);
  }
};

export const getSliders = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await Slider.find({ websiteKey: req.params.websiteKey, status: "active" }).sort(ordered);
    successResponse(res, "Sliders fetched", items);
  } catch (error) {
    next(error);
  }
};

export const getPageBySlug = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const page = await Page.findOne({
      websiteKey: req.params.websiteKey,
      slug: req.params.slug,
      status: "active"
    });
    if (!page) {
      res.status(404);
      throw new Error("Page not found");
    }
    const cleanPage = page.toObject();
    cleanPage.sections = cleanPage.sections
      .filter((section) => section.status === "active")
      .sort((a, b) => a.order - b.order);
    successResponse(res, "Page fetched", cleanPage);
  } catch (error) {
    next(error);
  }
};

export const getLandingSections = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await LandingSection.find({ websiteKey: req.params.websiteKey, status: "active" }).sort(ordered);
    successResponse(res, "Landing sections fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listProjects = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await Project.find({ websiteKey: req.params.websiteKey, status: "active" }).sort(ordered);
    successResponse(res, "Projects fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listFeaturedProjects = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await Project.find({
      websiteKey: req.params.websiteKey,
      status: "active",
      isFeatured: true
    }).sort(ordered);
    successResponse(res, "Featured projects fetched", items);
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const item = await Project.findOne({
      websiteKey: req.params.websiteKey,
      slug: req.params.slug,
      status: "active"
    });
    if (!item) {
      res.status(404);
      throw new Error("Project not found");
    }
    successResponse(res, "Project fetched", item);
  } catch (error) {
    next(error);
  }
};

export const listTestimonials = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await Testimonial.find({ websiteKey: req.params.websiteKey, status: "active" }).sort(ordered);
    successResponse(res, "Testimonials fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listEvents = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await Event.find({ websiteKey: req.params.websiteKey, status: "active" }).sort({
      eventDate: -1,
      order: 1
    });
    successResponse(res, "Events fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listAwardsCertifications = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await AwardCertification.find({
      websiteKey: req.params.websiteKey,
      status: "active",
      ...awardTypeQuery(req.query.type)
    }).sort(ordered);
    successResponse(res, "Awards and certifications fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listFeaturedAwardsCertifications = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await AwardCertification.find({
      websiteKey: req.params.websiteKey,
      status: "active",
      isFeatured: true,
      ...awardTypeQuery(req.query.type)
    }).sort(ordered);
    successResponse(res, "Featured awards and certifications fetched", items);
  } catch (error) {
    next(error);
  }
};

export const getAwardCertificationBySlug = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const item = await AwardCertification.findOne({
      websiteKey: req.params.websiteKey,
      slug: req.params.slug,
      status: "active"
    });
    if (!item) {
      res.status(404);
      throw new Error("Award or certification not found");
    }
    successResponse(res, "Award or certification fetched", item);
  } catch (error) {
    next(error);
  }
};

export const getEventBySlug = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const item = await Event.findOne({
      websiteKey: req.params.websiteKey,
      slug: req.params.slug,
      status: "active"
    });
    if (!item) {
      res.status(404);
      throw new Error("Event not found");
    }
    successResponse(res, "Event fetched", item);
  } catch (error) {
    next(error);
  }
};

export const listTeam = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await TeamMember.find({ websiteKey: req.params.websiteKey, status: "active" }).sort(ordered);
    successResponse(res, "Team fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listBlogs = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await Blog.find({ websiteKey: req.params.websiteKey, status: "published" }).sort({
      publishDate: -1,
      createdAt: -1
    });
    successResponse(res, "Blogs fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listFeaturedBlogs = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await Blog.find({
      websiteKey: req.params.websiteKey,
      status: "published",
      isFeatured: true
    }).sort({ publishDate: -1, createdAt: -1 });
    successResponse(res, "Featured blogs fetched", items);
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const item = await Blog.findOne({
      websiteKey: req.params.websiteKey,
      slug: req.params.slug,
      status: "published"
    });
    if (!item) {
      res.status(404);
      throw new Error("Blog not found");
    }
    successResponse(res, "Blog fetched", item);
  } catch (error) {
    next(error);
  }
};

export const createContactEnquiry = async (req, res, next) => {
  try {
    const { websiteKey } = req.params;
    const website = await ensureActiveWebsite(websiteKey);
    const enquiry = await ContactEnquiry.create({ ...req.body, websiteKey });
    void notifyContactSubmission(enquiry, website);
    successResponse(res, "Enquiry submitted successfully", enquiry, 201);
  } catch (error) {
    next(error);
  }
};

export const listCareers = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await Career.find({ websiteKey: req.params.websiteKey, status: "active" }).sort(ordered);
    successResponse(res, "Careers fetched", items);
  } catch (error) {
    next(error);
  }
};

export const getCareerBySlug = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const item = await Career.findOne({
      websiteKey: req.params.websiteKey,
      slug: req.params.slug,
      status: "active"
    });
    if (!item) {
      res.status(404);
      throw new Error("Career not found");
    }
    successResponse(res, "Career fetched", item);
  } catch (error) {
    next(error);
  }
};

export const applyForCareer = async (req, res, next) => {
  try {
    const { websiteKey, slug } = req.params;
    const website = await ensureActiveWebsite(websiteKey);
    const career = await Career.findOne({ websiteKey, slug, status: "active" });
    if (!career) {
      res.status(404);
      throw new Error("Career not found");
    }
    if (!req.file) {
      res.status(422);
      throw new Error("Resume file is required");
    }

    const email = String(req.body.email || "").trim().toLowerCase();
    const duplicate = await CareerApplication.exists({
      careerId: career._id,
      email,
      createdAt: { $gte: duplicateApplicationSince() }
    });
    if (duplicate) {
      removeUploadedFile(req.file);
      res.status(409);
      throw new Error("You have already applied for this job in the last 24 hours");
    }

    const applicationId = new mongoose.Types.ObjectId();
    const application = await CareerApplication.create({
      _id: applicationId,
      websiteKey,
      careerId: career._id,
      jobTitle: career.jobTitle,
      jobSlug: career.slug,
      applicantName: req.body.applicantName || req.body.name,
      email,
      phone: req.body.phone,
      alternatePhone: req.body.alternatePhone,
      currentLocation: req.body.currentLocation,
      totalExperience: req.body.totalExperience,
      currentCompany: req.body.currentCompany,
      currentSalary: req.body.currentSalary,
      expectedSalary: req.body.expectedSalary,
      noticePeriod: req.body.noticePeriod,
      coverLetter: req.body.coverLetter,
      message: req.body.message,
      resumeUrl: `/api/admin/career-applications/${applicationId}/resume/download`,
      resumePath: req.file.path,
      resumeOriginalName: req.file.originalname,
      resumeMimeType: req.file.mimetype,
      resumeSize: req.file.size,
      resume: `/api/admin/career-applications/${applicationId}/resume/download`,
      sourcePage: req.body.sourcePage,
      ipAddress: req.ip,
      userAgent: req.get("user-agent")
    });

    void notifyCareerApplication(application, website);

    successResponse(
      res,
      "Application submitted successfully",
      {
        applicationId: application._id,
        jobTitle: application.jobTitle,
        status: application.status
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

export const applyForCareerLegacy = async (req, res, next) => {
  try {
    const { websiteKey } = req.params;
    const website = await ensureActiveWebsite(websiteKey);

    let career = null;
    if (mongoose.isValidObjectId(req.body.careerId)) {
      career = await Career.findOne({
        _id: req.body.careerId,
        websiteKey,
        status: "active"
      });
    }

    if (!career && req.body.position) {
      career = await Career.findOne({
        websiteKey,
        jobTitle: String(req.body.position).trim(),
        status: "active"
      });
    }

    if (!career) {
      removeUploadedFile(req.file);
      res.status(404);
      throw new Error("Career not found");
    }

    if (!req.file) {
      res.status(422);
      throw new Error("Resume file is required");
    }

    const email = String(req.body.email || "").trim().toLowerCase();
    const duplicate = await CareerApplication.exists({
      careerId: career._id,
      email,
      createdAt: { $gte: duplicateApplicationSince() }
    });

    if (duplicate) {
      removeUploadedFile(req.file);
      res.status(409);
      throw new Error("You have already applied for this job in the last 24 hours");
    }

    const applicationId = new mongoose.Types.ObjectId();
    const application = await CareerApplication.create({
      _id: applicationId,
      websiteKey,
      careerId: career._id,
      jobTitle: career.jobTitle,
      jobSlug: career.slug,
      applicantName: req.body.fullName || req.body.applicantName || req.body.name,
      email,
      phone: req.body.phone,
      alternatePhone: req.body.alternatePhone,
      currentLocation: req.body.currentLocation,
      totalExperience: req.body.experience || req.body.totalExperience,
      currentCompany: req.body.currentCompany,
      currentSalary: req.body.currentSalary,
      expectedSalary: req.body.expectedSalary,
      noticePeriod: req.body.noticePeriod,
      coverLetter: req.body.coverLetter,
      message: req.body.message,
      resumeUrl: `/api/admin/career-applications/${applicationId}/resume/download`,
      resumePath: req.file.path,
      resumeOriginalName: req.file.originalname,
      resumeMimeType: req.file.mimetype,
      resumeSize: req.file.size,
      resume: `/api/admin/career-applications/${applicationId}/resume/download`,
      sourcePage: req.body.sourcePage || "/careers",
      ipAddress: req.ip,
      userAgent: req.get("user-agent")
    });

    void notifyCareerApplication(application, website);

    successResponse(
      res,
      "Application submitted successfully",
      {
        applicationId: application._id,
        jobTitle: application.jobTitle,
        status: application.status
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

export const listClientPartners = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await ClientPartner.find({
      websiteKey: req.params.websiteKey,
      status: "active",
      ...clientPartnerTypeQuery(req.query.type)
    }).sort(ordered);
    successResponse(res, "Clients and partners fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listClients = async (req, res, next) => {
  req.query.type = "client";
  return listClientPartners(req, res, next);
};

export const listPartners = async (req, res, next) => {
  req.query.type = "partner";
  return listClientPartners(req, res, next);
};

export const listAdvertisements = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const items = await Advertisement.find(activeAdvertisementQuery(req.params.websiteKey)).sort({ priority: -1, createdAt: -1 });
    successResponse(res, "Advertisements fetched", items);
  } catch (error) {
    next(error);
  }
};

export const listActiveAdvertisements = listAdvertisements;

export const getBrowserUpdateAdvertisement = async (req, res, next) => {
  try {
    await ensureActiveWebsite(req.params.websiteKey);
    const item = await Advertisement.findOne({
      ...activeAdvertisementQuery(req.params.websiteKey),
      adType: "browser-update"
    }).sort({ priority: -1, createdAt: -1 });
    successResponse(res, "Browser update banner fetched", item || null);
  } catch (error) {
    next(error);
  }
};
