export const WEBSITE_KEYS = ["group", "solar", "concrete", "enterprise"];

export const ACTIVE_STATUSES = ["active", "inactive"];

export const BLOG_STATUSES = ["draft", "published"];

export const CONTACT_STATUSES = ["new", "read", "replied", "closed"];

export const JOB_TYPES = ["full-time", "part-time", "internship", "contract"];

export const CAREER_STATUSES = ["active", "inactive", "closed"];

export const CAREER_APPLICATION_STATUSES = ["new", "reviewed", "shortlisted", "interview_scheduled", "rejected", "hired", "archived"];

export const INTERVIEW_MODES = ["phone", "google_meet", "zoom", "office", "other"];

export const AD_TYPES = ["popup", "top-banner", "bottom-banner", "sidebar", "browser-update"];

export const CLIENT_PARTNER_TYPES = ["client", "partner"];

export const SOLAR_PRODUCT_CATEGORIES = [
  "solar-panel",
  "inverter",
  "battery",
  "rooftop-kit",
  "mounting-structure",
  "accessories",
  "residential-solution",
  "commercial-solution"
];

export const SOLAR_PROMOTION_TYPES = ["government-scheme", "offer", "subsidy", "awareness", "custom"];

export const SOLAR_PROMOTION_BUTTON_ACTIONS = ["link", "contact-form", "scheme-enquiry", "none"];

export const SOLAR_PROMOTION_BACKGROUND_STYLES = ["light", "white", "brand", "custom"];

export const isValidWebsiteKey = (websiteKey) => WEBSITE_KEYS.includes(websiteKey);
