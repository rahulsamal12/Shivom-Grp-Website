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
import Advertisement from "../models/Advertisement.js";
import ClientPartner from "../models/ClientPartner.js";
import SolarProduct from "../models/SolarProduct.js";
import SolarPromotion from "../models/SolarPromotion.js";
import { createCrudController } from "./crudController.js";

export const websiteController = createCrudController(Website, "Website", {
  sort: { createdAt: 1 }
});

export const sliderController = createCrudController(Slider, "Slider");

export const pageController = createCrudController(Page, "Page", {
  hasSlug: true,
  forceWebsiteKey: "group"
});

export const landingSectionController = createCrudController(LandingSection, "Landing section");

export const projectController = createCrudController(Project, "Project", {
  hasSlug: true
});

export const testimonialController = createCrudController(Testimonial, "Testimonial");

export const eventController = createCrudController(Event, "Event", {
  hasSlug: true,
  sort: { eventDate: -1, order: 1, createdAt: -1 }
});

export const awardCertificationController = createCrudController(AwardCertification, "Award or certification", {
  hasSlug: true,
  sort: { order: 1, issueDate: -1, createdAt: -1 }
});

export const teamController = createCrudController(TeamMember, "Team member");

export const blogController = createCrudController(Blog, "Blog", {
  hasSlug: true,
  sort: { publishDate: -1, createdAt: -1 }
});

export const contactController = createCrudController(ContactEnquiry, "Contact enquiry", {
  sort: { createdAt: -1 }
});

export const careerController = createCrudController(Career, "Career", {
  hasSlug: true,
  sort: { order: 1, createdAt: -1 }
});

export { careerApplicationController } from "./careerApplicationController.js";

export const advertisementController = createCrudController(Advertisement, "Advertisement", {
  sort: { priority: -1, createdAt: -1 }
});

export const clientPartnerController = createCrudController(ClientPartner, "Client or partner", {
  sort: { order: 1, createdAt: -1 }
});

export const solarProductController = createCrudController(SolarProduct, "Solar product", {
  hasSlug: true,
  forceWebsiteKey: "solar",
  sort: { order: 1, createdAt: -1 }
});

export const solarPromotionController = createCrudController(SolarPromotion, "Solar promotion", {
  forceWebsiteKey: "solar",
  sort: { order: 1, createdAt: -1 }
});
