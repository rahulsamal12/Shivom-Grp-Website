import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

const LOGO_CID = "shivom-email-logo";
let transporter;
let missingConfigWarningShown = false;

const emailEnabled = () => String(process.env.EMAIL_ENABLED || "true").toLowerCase() !== "false";

const smtpConfigured = () =>
  Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.MAIL_FROM_EMAIL
  );

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      requireTLS: Number(process.env.SMTP_PORT || 587) === 587
    });
  }
  return transporter;
};

const getLogoOptions = () => {
  const logoPath = path.resolve(process.env.MAIL_LOGO_PATH || "assets/email-logo.png");
  if (fs.existsSync(logoPath)) {
    return {
      source: `cid:${LOGO_CID}`,
      attachment: {
        filename: "shivom-group-logo.png",
        path: logoPath,
        cid: LOGO_CID,
        contentDisposition: "inline"
      }
    };
  }
  return {
    source: process.env.MAIL_LOGO_URL || "https://shivomgroup.in/logo.png",
    attachment: null
  };
};

export const sendEmail = async ({
  to,
  cc,
  bcc,
  subject,
  html,
  text,
  replyTo,
  attachments = []
}) => {
  if (!emailEnabled()) return { skipped: true, reason: "disabled" };
  if (!smtpConfigured()) {
    if (!missingConfigWarningShown) {
      console.warn("[email] SMTP is not fully configured; email delivery is disabled");
      missingConfigWarningShown = true;
    }
    return { skipped: true, reason: "not_configured" };
  }

  const logo = getLogoOptions();
  const messageAttachments = logo.attachment ? [logo.attachment, ...attachments] : attachments;

  return getTransporter().sendMail({
    from: {
      name: process.env.MAIL_FROM_NAME || "Shivom Group",
      address: process.env.MAIL_FROM_EMAIL
    },
    to,
    cc,
    bcc,
    replyTo: replyTo || process.env.MAIL_REPLY_TO || process.env.MAIL_FROM_EMAIL,
    subject,
    text,
    html: html?.replaceAll("{{MAIL_LOGO_SRC}}", logo.source),
    attachments: messageAttachments
  });
};

export const verifyEmailTransport = async () => {
  if (!smtpConfigured()) throw new Error("SMTP environment variables are incomplete");
  return getTransporter().verify();
};
