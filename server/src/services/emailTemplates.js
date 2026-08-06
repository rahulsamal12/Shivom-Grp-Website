const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const display = (value, fallback = "Not provided") => escapeHtml(value || fallback);

const formatDate = (value = new Date()) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return display(value);
  return escapeHtml(
    date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata"
    })
  );
};

const rows = (items) =>
  items
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 12px;color:#64748b;border-bottom:1px solid #e5e7eb;width:34%;font-size:13px;vertical-align:top">${escapeHtml(
            label
          )}</td>
          <td style="padding:10px 12px;color:#111827;border-bottom:1px solid #e5e7eb;font-size:13px;line-height:1.55;vertical-align:top;white-space:pre-line">${display(
            value
          )}</td>
        </tr>`
    )
    .join("");

const button = (label, url) =>
  url
    ? `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:22px 0 0">
        <tr><td style="background:#ff7a16">
          <a href="${escapeHtml(
            url
          )}" style="display:inline-block;padding:12px 20px;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px">${escapeHtml(
            label
          )}</a>
        </td></tr>
      </table>`
    : "";

const layout = ({ preheader, title, intro, content }) => `<!doctype html>
<html>
  <head><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#f3f6f9;font-family:Arial,Helvetica,sans-serif;color:#111827">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6f9;padding:28px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:660px;background:#ffffff;border:1px solid #dfe5ec">
          <tr>
            <td style="padding:20px 28px;border-bottom:4px solid #ff7a16">
              <a href="https://shivomgroup.in" style="text-decoration:none">
                <img src="{{MAIL_LOGO_SRC}}" width="92" alt="Shivom Group" style="display:block;width:92px;max-width:92px;height:auto;border:0">
              </a>
            </td>
          </tr>
          <tr><td style="padding:28px">
            <div style="font-size:12px;line-height:1.4;color:#ff7a16;font-weight:700;text-transform:uppercase">Shivom Group</div>
            <h1 style="margin:7px 0 12px;font-size:25px;line-height:1.25;color:#0b2f76;font-weight:700">${escapeHtml(
              title
            )}</h1>
            <p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:#475569">${escapeHtml(intro)}</p>
            ${content}
          </td></tr>
          <tr><td style="padding:19px 28px;background:#0b2f76;color:#dbe7ff;font-size:12px;line-height:1.65">
            <strong style="color:#ffffff">Shivom Group</strong><br>
            <a href="https://shivomgroup.in" style="color:#ffffff;text-decoration:none">shivomgroup.in</a>
            &nbsp;|&nbsp;
            <a href="mailto:hr@shivomgroup.in" style="color:#ffffff;text-decoration:none">hr@shivomgroup.in</a>
            <div style="margin-top:8px;color:#b9cae8">This transactional email was generated from the Shivom Group website.</div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

export const contactAdminTemplate = (enquiry, website) => ({
  subject: `New website enquiry: ${enquiry.subject}`,
  text: `New enquiry from ${enquiry.name} (${enquiry.email}) for ${website?.websiteName || enquiry.websiteKey}. Subject: ${enquiry.subject}. Message: ${enquiry.message}`,
  html: layout({
    preheader: `New enquiry from ${enquiry.name}`,
    title: "New Website Enquiry",
    intro: `A visitor submitted an enquiry through ${website?.websiteName || enquiry.websiteKey}.`,
    content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb">
      ${rows([
        ["Reference", enquiry._id],
        ["Received", formatDate(enquiry.createdAt)],
        ["Name", enquiry.name],
        ["Email", enquiry.email],
        ["Phone", enquiry.phone],
        ["Subject", enquiry.subject],
        ["Enquiry type", enquiry.enquiryType],
        ["Source page", enquiry.sourcePage],
        ["Message", enquiry.message]
      ])}
    </table>
    ${button("Reply to visitor", `mailto:${enquiry.email}`)}`
  })
});

export const contactAcknowledgementTemplate = (enquiry) => ({
  subject: `We received your enquiry [${enquiry._id}]`,
  text: `Hello ${enquiry.name}, we received your enquiry "${enquiry.subject}". Our team will review it and respond shortly. Reference: ${enquiry._id}`,
  html: layout({
    preheader: "Your enquiry has been received by Shivom Group",
    title: "Thank You for Contacting Us",
    intro: `Hello ${enquiry.name}, your message has reached the Shivom Group team.`,
    content: `<p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:#334155">
      We have received your enquiry and our team will review the details. You can expect a response as soon as possible during business hours.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb">
      ${rows([
        ["Reference", enquiry._id],
        ["Subject", enquiry.subject],
        ["Submitted", formatDate(enquiry.createdAt)],
        ["Message", enquiry.message]
      ])}
    </table>
    <p style="margin:20px 0 0;font-size:13px;line-height:1.65;color:#64748b">
      Please keep the reference number above when replying to our team.
    </p>`
  })
});

export const careerAdminTemplate = (application, website, adminUrl) => ({
  subject: `New application: ${application.jobTitle} - ${application.applicantName}`,
  text: `New application from ${application.applicantName} (${application.email}) for ${application.jobTitle}. Application ID: ${application._id}`,
  html: layout({
    preheader: `New candidate for ${application.jobTitle}`,
    title: "New Career Application",
    intro: `${application.applicantName} applied for ${application.jobTitle} through ${website?.websiteName || application.websiteKey}.`,
    content: `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb">
      ${rows([
        ["Application ID", application._id],
        ["Applied", formatDate(application.createdAt)],
        ["Applicant", application.applicantName],
        ["Email", application.email],
        ["Phone", application.phone],
        ["Alternate phone", application.alternatePhone],
        ["Position", application.jobTitle],
        ["Experience", application.totalExperience],
        ["Current location", application.currentLocation],
        ["Current company", application.currentCompany],
        ["Current salary", application.currentSalary],
        ["Expected salary", application.expectedSalary],
        ["Notice period", application.noticePeriod],
        ["Resume", application.resumeOriginalName],
        ["Cover letter", application.coverLetter],
        ["Message", application.message]
      ])}
    </table>
    ${button("Review application securely", adminUrl)}`
  })
});

export const careerAcknowledgementTemplate = (application) => ({
  subject: `Application received: ${application.jobTitle} [${application._id}]`,
  text: `Hello ${application.applicantName}, your application for ${application.jobTitle} has been received. Our HR team will review your profile and contact you if shortlisted. Application ID: ${application._id}`,
  html: layout({
    preheader: `Your application for ${application.jobTitle} was submitted successfully`,
    title: "Your Application Has Been Received",
    intro: `Hello ${application.applicantName}, thank you for your interest in joining Shivom Group.`,
    content: `<p style="margin:0 0 18px;font-size:15px;line-height:1.75;color:#334155">
      Our HR team has received your application and CV. We will review your experience against the role requirements and contact you if your profile is shortlisted.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb">
      ${rows([
        ["Application ID", application._id],
        ["Position", application.jobTitle],
        ["Submitted", formatDate(application.createdAt)],
        ["Current status", "New"]
      ])}
    </table>
    <div style="margin:20px 0 0;padding:16px;background:#f8fafc;border-left:4px solid #ff7a16;color:#475569;font-size:13px;line-height:1.65">
      Please keep this email for your records. Our HR team will contact you from an official <strong>@shivomgroup.in</strong> email address.
    </div>`
  })
});
