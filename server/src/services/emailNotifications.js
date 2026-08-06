import { sendEmail } from "./emailService.js";
import {
  careerAcknowledgementTemplate,
  careerAdminTemplate,
  contactAcknowledgementTemplate,
  contactAdminTemplate
} from "./emailTemplates.js";

const hrEmail = () =>
  process.env.HR_NOTIFICATION_EMAIL ||
  process.env.ADMIN_NOTIFICATION_EMAIL ||
  "hr@shivomgroup.in";

const deliver = async (label, messages) => {
  const validMessages = messages.filter((message) => message.to);
  const results = await Promise.allSettled(validMessages.map((message) => sendEmail(message)));
  results.forEach((result) => {
    if (result.status === "rejected") {
      console.error(`[email] ${label} delivery failed:`, result.reason?.message || result.reason);
    }
  });
};

export const notifyContactSubmission = async (enquiry, website) => {
  await deliver("contact", [
    {
      to: process.env.CONTACT_NOTIFICATION_EMAIL || hrEmail(),
      replyTo: enquiry.email,
      ...contactAdminTemplate(enquiry, website)
    },
    {
      to: enquiry.email,
      replyTo: hrEmail(),
      ...contactAcknowledgementTemplate(enquiry)
    }
  ]);
};

export const notifyCareerApplication = async (application, website) => {
  const adminBaseUrl = String(process.env.ADMIN_URL || "").replace(/\/$/, "");
  const adminUrl = adminBaseUrl
    ? `${adminBaseUrl}/career-applications/${application._id}`
    : "";

  await deliver("career application", [
    {
      to: process.env.CAREER_NOTIFICATION_EMAIL || hrEmail(),
      replyTo: application.email,
      ...careerAdminTemplate(application, website, adminUrl)
    },
    {
      to: application.email,
      replyTo: hrEmail(),
      ...careerAcknowledgementTemplate(application)
    }
  ]);
};
