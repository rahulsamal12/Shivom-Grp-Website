import express from "express";
import {
  createContactEnquiry,
  applyForCareer,
  applyForCareerLegacy,
  getAwardCertificationBySlug,
  getBlogBySlug,
  getBrowserUpdateAdvertisement,
  getCareerBySlug,
  getEventBySlug,
  getHome,
  getLandingSections,
  getPageBySlug,
  getProjectBySlug,
  getSliders,
  listBlogs,
  listAwardsCertifications,
  listActiveAdvertisements,
  listAdvertisements,
  listCareers,
  listClientPartners,
  listClients,
  listEvents,
  listPartners,
  listFeaturedAwardsCertifications,
  listFeaturedBlogs,
  listFeaturedProjects,
  listProjects,
  listTeam,
  listTestimonials
} from "../controllers/publicController.js";
import { resumeUpload } from "../middleware/uploadMiddleware.js";
import {
  getSolarProductBySlug,
  listActiveSolarPromotions,
  listFeaturedSolarProducts,
  listSolarProducts,
  listSolarPromotions
} from "../controllers/solarPublicController.js";

const router = express.Router();

router.get("/solar/products", listSolarProducts);
router.get("/solar/products/featured", listFeaturedSolarProducts);
router.get("/solar/products/:slug", getSolarProductBySlug);
router.get("/solar/promotions", listSolarPromotions);
router.get("/solar/promotions/active", listActiveSolarPromotions);

router.get("/:websiteKey/home", getHome);
router.get("/:websiteKey/sliders", getSliders);
router.get("/:websiteKey/pages/:slug", getPageBySlug);
router.get("/:websiteKey/landing-sections", getLandingSections);
router.get("/:websiteKey/projects", listProjects);
router.get("/:websiteKey/projects/featured", listFeaturedProjects);
router.get("/:websiteKey/projects/:slug", getProjectBySlug);
router.get("/:websiteKey/testimonials", listTestimonials);
router.get("/:websiteKey/events", listEvents);
router.get("/:websiteKey/events/:slug", getEventBySlug);
router.get("/:websiteKey/awards-certifications", listAwardsCertifications);
router.get("/:websiteKey/awards-certifications/featured", listFeaturedAwardsCertifications);
router.get("/:websiteKey/awards-certifications/:slug", getAwardCertificationBySlug);
router.get("/:websiteKey/team", listTeam);
router.get("/:websiteKey/blogs", listBlogs);
router.get("/:websiteKey/blogs/featured", listFeaturedBlogs);
router.get("/:websiteKey/blogs/:slug", getBlogBySlug);
router.get("/:websiteKey/client-partners", listClientPartners);
router.get("/:websiteKey/clients", listClients);
router.get("/:websiteKey/partners", listPartners);
router.get("/:websiteKey/careers", listCareers);
router.get("/:websiteKey/careers/:slug", getCareerBySlug);
router.post("/:websiteKey/careers/:slug/apply", resumeUpload.single("resume"), applyForCareer);
router.post("/:websiteKey/career-applications", resumeUpload.single("resume"), applyForCareerLegacy);
router.get("/:websiteKey/advertisements", listAdvertisements);
router.get("/:websiteKey/advertisements/active", listActiveAdvertisements);
router.get("/:websiteKey/browser-update", getBrowserUpdateAdvertisement);
router.post("/:websiteKey/contact", createContactEnquiry);

export default router;
