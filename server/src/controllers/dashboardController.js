import Website from "../models/Website.js";
import Slider from "../models/Slider.js";
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
import SolarProduct from "../models/SolarProduct.js";
import SolarPromotion from "../models/SolarPromotion.js";
import { successResponse } from "../utils/apiResponse.js";

export const getDashboardCounts = async (req, res, next) => {
  try {
    const [
      totalWebsites,
      totalSliders,
      totalProjects,
      totalTestimonials,
      totalEvents,
      totalAwardsCertifications,
      totalTeamMembers,
      totalBlogs,
      totalContactEnquiries,
      totalCareers,
      activeCareers,
      totalCareerApplications,
      newCareerApplications,
      reviewedCareerApplications,
      shortlistedCareerApplications,
      interviewScheduledCareerApplications,
      rejectedCareerApplications,
      hiredCareerApplications,
      totalAdvertisements,
      activeAdvertisements,
      totalClientPartners,
      totalSolarProducts,
      activeSolarProducts,
      featuredSolarProducts,
      totalSolarPromotions,
      activeSolarPromotions
    ] = await Promise.all([
      Website.countDocuments(),
      Slider.countDocuments(),
      Project.countDocuments(),
      Testimonial.countDocuments(),
      Event.countDocuments(),
      AwardCertification.countDocuments(),
      TeamMember.countDocuments(),
      Blog.countDocuments(),
      ContactEnquiry.countDocuments(),
      Career.countDocuments(),
      Career.countDocuments({ status: "active" }),
      CareerApplication.countDocuments(),
      CareerApplication.countDocuments({ status: "new" }),
      CareerApplication.countDocuments({ status: "reviewed" }),
      CareerApplication.countDocuments({ status: "shortlisted" }),
      CareerApplication.countDocuments({ status: "interview_scheduled" }),
      CareerApplication.countDocuments({ status: "rejected" }),
      CareerApplication.countDocuments({ status: "hired" }),
      Advertisement.countDocuments(),
      Advertisement.countDocuments({ status: "active" }),
      ClientPartner.countDocuments(),
      SolarProduct.countDocuments(),
      SolarProduct.countDocuments({ status: "active" }),
      SolarProduct.countDocuments({ isFeatured: true }),
      SolarPromotion.countDocuments(),
      SolarPromotion.countDocuments({ status: "active" })
    ]);

    successResponse(res, "Dashboard counts fetched", {
      totalWebsites,
      totalSliders,
      totalProjects,
      totalTestimonials,
      totalEvents,
      totalAwardsCertifications,
      totalTeamMembers,
      totalBlogs,
      totalContactEnquiries,
      totalCareers,
      activeCareers,
      totalCareerApplications,
      newCareerApplications,
      reviewedCareerApplications,
      shortlistedCareerApplications,
      interviewScheduledCareerApplications,
      rejectedCareerApplications,
      hiredCareerApplications,
      totalAdvertisements,
      activeAdvertisements,
      totalClientPartners,
      totalSolarProducts,
      activeSolarProducts,
      featuredSolarProducts,
      totalSolarPromotions,
      activeSolarPromotions
    });
  } catch (error) {
    next(error);
  }
};
