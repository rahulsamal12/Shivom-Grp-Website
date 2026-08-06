import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardCounts } from "../controllers/dashboardController.js";
import {
  awardCertificationController,
  advertisementController,
  blogController,
  careerApplicationController,
  careerController,
  clientPartnerController,
  contactController,
  eventController,
  landingSectionController,
  pageController,
  projectController,
  sliderController,
  solarProductController,
  solarPromotionController,
  teamController,
  testimonialController,
  websiteController
} from "../controllers/adminResourceControllers.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { uploadMultiple, uploadSingle } from "../controllers/uploadController.js";

const router = express.Router();

const bindCrud = (path, controller) => {
  router.get(path, controller.list);
  router.post(path, controller.create);
  router.get(`${path}/:id`, controller.getOne);
  router.put(`${path}/:id`, controller.update);
  router.delete(`${path}/:id`, controller.remove);
  if (controller.patchStatus) router.patch(`${path}/:id/status`, controller.patchStatus);
};

router.use(protect);

router.get("/dashboard", getDashboardCounts);
bindCrud("/websites", websiteController);
bindCrud("/sliders", sliderController);
bindCrud("/pages", pageController);
bindCrud("/landing-sections", landingSectionController);
bindCrud("/projects", projectController);
bindCrud("/testimonials", testimonialController);
bindCrud("/events", eventController);
bindCrud("/awards-certifications", awardCertificationController);
bindCrud("/team", teamController);
bindCrud("/blogs", blogController);
bindCrud("/careers", careerController);
bindCrud("/career-applications", careerApplicationController);
router.get("/career-applications/:id/resume/view", careerApplicationController.viewResume);
router.get("/career-applications/:id/resume/download", careerApplicationController.downloadResume);
bindCrud("/advertisements", advertisementController);
bindCrud("/client-partners", clientPartnerController);
bindCrud("/solar-products", solarProductController);
bindCrud("/solar-promotions", solarPromotionController);

router.get("/contacts", contactController.list);
router.get("/contacts/:id", contactController.getOne);
router.put("/contacts/:id", contactController.update);
router.delete("/contacts/:id", contactController.remove);

router.post("/upload/single", upload.single("image"), uploadSingle);
router.post("/upload/multiple", upload.array("images", 10), uploadMultiple);

export default router;
