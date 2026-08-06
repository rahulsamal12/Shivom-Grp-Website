export const websiteOptions = [
  { value: "group", label: "Group" },
  { value: "solar", label: "Solar" },
  { value: "concrete", label: "Concrete" },
  { value: "enterprise", label: "Enterprises" }
];

const activeStatus = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" }
];

const blogStatus = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" }
];

const contactStatus = [
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" }
];

const careerStatus = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "closed", label: "Closed" }
];

const jobTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "internship", label: "Internship" },
  { value: "contract", label: "Contract" }
];

const careerApplicationStatus = [
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" }
];

const advertisementTypes = [
  { value: "popup", label: "Popup" },
  { value: "top-banner", label: "Top banner" },
  { value: "bottom-banner", label: "Bottom banner" },
  { value: "sidebar", label: "Sidebar" },
  { value: "browser-update", label: "Browser update" }
];

const awardCertificationType = [
  { value: "award", label: "Award" },
  { value: "certification", label: "Certification" }
];

const clientPartnerType = [
  { value: "client", label: "Client" },
  { value: "partner", label: "Partner" }
];

const solarProductCategories = [
  { value: "solar-panel", label: "Solar Panel" },
  { value: "inverter", label: "Inverter" },
  { value: "battery", label: "Battery" },
  { value: "rooftop-kit", label: "Rooftop Kit" },
  { value: "mounting-structure", label: "Mounting Structure" },
  { value: "accessories", label: "Accessories" },
  { value: "residential-solution", label: "Residential Solution" },
  { value: "commercial-solution", label: "Commercial Solution" }
];

const solarPromotionTypes = [
  { value: "government-scheme", label: "Government scheme" },
  { value: "offer", label: "Offer" },
  { value: "subsidy", label: "Subsidy" },
  { value: "awareness", label: "Awareness" },
  { value: "custom", label: "Custom" }
];

const solarPromotionButtonActions = [
  { value: "link", label: "Link" },
  { value: "contact-form", label: "Contact form" },
  { value: "scheme-enquiry", label: "Scheme enquiry" },
  { value: "none", label: "None" }
];

const solarPromotionBackgroundStyles = [
  { value: "light", label: "Light" },
  { value: "white", label: "White" },
  { value: "brand", label: "Brand" },
  { value: "custom", label: "Custom" }
];

const websiteField = { name: "websiteKey", label: "Website", type: "select", options: websiteOptions, required: true };
const orderField = { name: "order", label: "Order", type: "number" };
const activeField = { name: "status", label: "Status", type: "select", options: activeStatus };
const seoFields = [
  { name: "metaTitle", label: "Meta title" },
  { name: "metaDescription", label: "Meta description", type: "textarea" }
];

export const resources = {
  websites: {
    title: "Website Management",
    endpoint: "/admin/websites",
    createLabel: "Add Website",
    filterByWebsite: false,
    columns: [
      { key: "websiteName", label: "Website" },
      { key: "websiteKey", label: "Key" },
      { key: "contactEmail", label: "Email" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "websiteName", label: "Website name", required: true },
      { name: "logo", label: "Logo", type: "image" },
      { name: "favicon", label: "Favicon", type: "image" },
      { name: "primaryColor", label: "Primary color", type: "color" },
      { name: "secondaryColor", label: "Secondary color", type: "color" },
      ...seoFields,
      { name: "contactEmail", label: "Contact email", type: "email" },
      { name: "contactPhone", label: "Contact phone" },
      { name: "address", label: "Address", type: "textarea" },
      { name: "socialLinks", label: "Social links JSON", type: "json", hint: "{\"facebook\":\"https://...\"}" },
      activeField
    ]
  },
  sliders: {
    title: "Slider / Hero Banners",
    endpoint: "/admin/sliders",
    createLabel: "Add Slider",
    filterByWebsite: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "websiteKey", label: "Website" },
      { key: "order", label: "Order" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "title", label: "Title", required: true },
      { name: "subtitle", label: "Subtitle" },
      { name: "buttonText", label: "Button text" },
      { name: "buttonLink", label: "Button link" },
      { name: "image", label: "Desktop image", type: "image", required: true },
      { name: "mobileImage", label: "Mobile image", type: "image" },
      orderField,
      activeField
    ]
  },
  pages: {
    title: "Group Website Pages",
    endpoint: "/admin/pages",
    createLabel: "Add Page",
    filterByWebsite: false,
    columns: [
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "status", label: "Status" }
    ],
    fields: [
      { name: "title", label: "Title", required: true },
      { name: "slug", label: "Slug" },
      ...seoFields,
      { name: "bannerImage", label: "Banner image", type: "image" },
      {
        name: "sections",
        label: "Sections JSON",
        type: "json",
        hint: "[{\"sectionKey\":\"intro\",\"heading\":\"About\",\"description\":\"...\",\"order\":1,\"status\":\"active\"}]"
      },
      activeField
    ]
  },
  landingSections: {
    title: "Landing Page Sections",
    endpoint: "/admin/landing-sections",
    createLabel: "Add Section",
    filterByWebsite: true,
    columns: [
      { key: "heading", label: "Heading" },
      { key: "websiteKey", label: "Website" },
      { key: "sectionType", label: "Type" },
      { key: "status", label: "Status" }
    ],
    fields: [
      {
        ...websiteField,
        options: websiteOptions.filter((item) => item.value !== "group")
      },
      { name: "sectionType", label: "Section type", type: "select", required: true, options: [
        { value: "hero", label: "Hero" },
        { value: "about", label: "About" },
        { value: "services", label: "Services" },
        { value: "features", label: "Features" },
        { value: "projects", label: "Projects" },
        { value: "testimonials", label: "Testimonials" },
        { value: "contact", label: "Contact" }
      ] },
      { name: "heading", label: "Heading", required: true },
      { name: "subHeading", label: "Sub heading" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image", type: "image" },
      { name: "items", label: "Items JSON", type: "json", hint: "[{\"title\":\"Service\",\"description\":\"...\",\"icon\":\"...\"}]" },
      orderField,
      activeField
    ]
  },
  projects: {
    title: "Projects",
    endpoint: "/admin/projects",
    createLabel: "Add Project",
    filterByWebsite: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "websiteKey", label: "Website" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "title", label: "Title", required: true },
      { name: "slug", label: "Slug" },
      { name: "shortDescription", label: "Short description", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "category", label: "Category" },
      { name: "location", label: "Location" },
      { name: "clientName", label: "Client name" },
      { name: "projectDate", label: "Project date", type: "date" },
      { name: "featuredImage", label: "Featured image", type: "image" },
      { name: "gallery", label: "Gallery", type: "image", multiple: true },
      { name: "isFeatured", label: "Featured", type: "checkbox" },
      orderField,
      activeField,
      ...seoFields
    ]
  },
  testimonials: {
    title: "Testimonials",
    endpoint: "/admin/testimonials",
    createLabel: "Add Testimonial",
    filterByWebsite: true,
    columns: [
      { key: "clientName", label: "Client" },
      { key: "websiteKey", label: "Website" },
      { key: "rating", label: "Rating" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "clientName", label: "Client name", required: true },
      { name: "designation", label: "Designation" },
      { name: "companyName", label: "Company name" },
      { name: "message", label: "Message", type: "textarea", required: true },
      { name: "image", label: "Image", type: "image" },
      { name: "rating", label: "Rating", type: "number" },
      orderField,
      activeField
    ]
  },
  events: {
    title: "Events",
    endpoint: "/admin/events",
    createLabel: "Add Event",
    filterByWebsite: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "websiteKey", label: "Website" },
      { key: "eventDate", label: "Date" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "title", label: "Title", required: true },
      { name: "slug", label: "Slug" },
      { name: "shortDescription", label: "Short description", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "eventDate", label: "Event date", type: "date" },
      { name: "featuredImage", label: "Featured image", type: "image" },
      { name: "gallery", label: "Gallery", type: "image", multiple: true },
      orderField,
      activeField,
      ...seoFields
    ]
  },
  awardsCertifications: {
    title: "Awards & Certifications",
    endpoint: "/admin/awards-certifications",
    createLabel: "Add Award / Certification",
    filterByWebsite: true,
    filterFields: [
      {
        name: "type",
        label: "Type",
        allLabel: "All types",
        options: awardCertificationType
      }
    ],
    columns: [
      { key: "title", label: "Title" },
      { key: "websiteKey", label: "Website" },
      { key: "type", label: "Type" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "title", label: "Title", required: true },
      { name: "slug", label: "Slug" },
      { name: "type", label: "Type", type: "select", options: awardCertificationType, required: true },
      { name: "shortDescription", label: "Short description", type: "textarea" },
      { name: "image", label: "Award / certificate image", type: "image" },
      { name: "isFeatured", label: "Featured", type: "checkbox" },
      orderField,
      activeField
    ]
  },
  team: {
    title: "Team / Staff Profiles",
    endpoint: "/admin/team",
    createLabel: "Add Member",
    filterByWebsite: true,
    columns: [
      { key: "name", label: "Name" },
      { key: "websiteKey", label: "Website" },
      { key: "designation", label: "Designation" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "name", label: "Name", required: true },
      { name: "designation", label: "Designation", required: true },
      { name: "department", label: "Department" },
      { name: "bio", label: "Bio", type: "textarea" },
      { name: "image", label: "Image", type: "image" },
      { name: "email", label: "Email", type: "email" },
      { name: "phone", label: "Phone" },
      { name: "linkedin", label: "LinkedIn" },
      orderField,
      activeField
    ]
  },
  blogs: {
    title: "Blogs / Recent News",
    endpoint: "/admin/blogs",
    createLabel: "Add Blog",
    filterByWebsite: true,
    columns: [
      { key: "title", label: "Title" },
      { key: "websiteKey", label: "Website" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "title", label: "Title", required: true },
      { name: "slug", label: "Slug" },
      { name: "shortDescription", label: "Short description", type: "textarea" },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "featuredImage", label: "Featured image", type: "image" },
      { name: "category", label: "Category" },
      { name: "tags", label: "Tags JSON", type: "json", hint: "[\"news\",\"group\"]" },
      { name: "author", label: "Author" },
      { name: "publishDate", label: "Publish date", type: "date" },
      { name: "status", label: "Status", type: "select", options: blogStatus },
      { name: "isFeatured", label: "Featured", type: "checkbox" },
      ...seoFields
    ]
  },
  contacts: {
    title: "Contact Enquiries",
    endpoint: "/admin/contacts",
    createLabel: "Add Enquiry",
    disableCreate: true,
    filterByWebsite: true,
    columns: [
      { key: "name", label: "Name" },
      { key: "websiteKey", label: "Website" },
      { key: "email", label: "Email" },
      { key: "subject", label: "Subject" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone" },
      { name: "subject", label: "Subject", required: true },
      { name: "message", label: "Message", type: "textarea", required: true },
      { name: "sourcePage", label: "Source page" },
      { name: "status", label: "Status", type: "select", options: contactStatus }
    ]
  },
  careers: {
    title: "Career / Job Openings",
    endpoint: "/admin/careers",
    createLabel: "Add Career",
    filterByWebsite: true,
    filterFields: [
      { name: "jobType", label: "Job type", allLabel: "All job types", options: jobTypes },
      { name: "status", label: "Status", allLabel: "All statuses", options: careerStatus }
    ],
    columns: [
      { key: "jobTitle", label: "Job title" },
      { key: "websiteKey", label: "Website" },
      { key: "jobType", label: "Type" },
      { key: "location", label: "Location" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "jobTitle", label: "Job title", required: true },
      { name: "slug", label: "Slug" },
      { name: "department", label: "Department" },
      { name: "jobType", label: "Job type", type: "select", options: jobTypes, required: true },
      { name: "location", label: "Location", required: true },
      { name: "experience", label: "Experience" },
      { name: "salaryRange", label: "Salary range" },
      { name: "shortDescription", label: "Short description", type: "textarea" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "responsibilities", label: "Responsibilities", type: "repeatable", hint: "One responsibility per line" },
      { name: "requirements", label: "Requirements", type: "repeatable", hint: "One requirement per line" },
      { name: "skills", label: "Skills", type: "repeatable", hint: "One skill per line" },
      { name: "applicationDeadline", label: "Application deadline", type: "date" },
      { name: "applyEmail", label: "Apply email", type: "email" },
      { name: "applyLink", label: "Apply link" },
      orderField,
      { name: "status", label: "Status", type: "select", options: careerStatus },
      ...seoFields
    ]
  },
  careerApplications: {
    title: "Career Applications",
    endpoint: "/admin/career-applications",
    createLabel: "Add Application",
    disableCreate: true,
    filterByWebsite: true,
    filterFields: [
      { name: "status", label: "Status", allLabel: "All statuses", options: careerApplicationStatus }
    ],
    columns: [
      { key: "applicantName", label: "Applicant" },
      { key: "jobTitle", label: "Job title" },
      { key: "websiteKey", label: "Website" },
      { key: "email", label: "Email" },
      { key: "resume", label: "Resume", type: "link" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "careerId", label: "Career ID", required: true },
      { name: "jobTitle", label: "Job title", required: true },
      { name: "applicantName", label: "Applicant name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone" },
      { name: "resume", label: "Resume URL", required: true },
      { name: "coverLetter", label: "Cover letter", type: "textarea" },
      { name: "message", label: "Message", type: "textarea" },
      { name: "status", label: "Status", type: "select", options: careerApplicationStatus }
    ]
  },
  clientPartners: {
    title: "Clients & Partners",
    endpoint: "/admin/client-partners",
    createLabel: "Add Client / Partner",
    filterByWebsite: true,
    filterFields: [
      { name: "type", label: "Type", allLabel: "All types", options: clientPartnerType },
      { name: "status", label: "Status", allLabel: "All statuses", options: activeStatus }
    ],
    columns: [
      { key: "logo", label: "Logo", type: "image" },
      { key: "name", label: "Name" },
      { key: "websiteKey", label: "Website" },
      { key: "type", label: "Type" },
      { key: "order", label: "Order" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "name", label: "Name", required: true },
      { name: "logo", label: "Logo", type: "image", required: true },
      { name: "websiteUrl", label: "Website URL" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "type", label: "Type", type: "select", options: clientPartnerType, required: true },
      orderField,
      activeField
    ]
  },
  solarProducts: {
    title: "Solar Products",
    endpoint: "/admin/solar-products",
    createLabel: "Add Solar Product",
    statusPatch: true,
    filterFields: [
      { name: "category", label: "Category", allLabel: "All categories", options: solarProductCategories },
      { name: "status", label: "Status", allLabel: "All statuses", options: activeStatus },
      { name: "isFeatured", label: "Featured", allLabel: "All products", options: [
        { value: "true", label: "Featured" },
        { value: "false", label: "Not featured" }
      ] }
    ],
    booleanToggles: [
      { name: "isFeatured", trueLabel: "Featured", falseLabel: "Not featured" }
    ],
    columns: [
      { key: "featuredImage", label: "Image", type: "image" },
      { key: "title", label: "Product" },
      { key: "category", label: "Category" },
      { key: "brand", label: "Brand" },
      { key: "isFeatured", label: "Featured", type: "boolean" },
      { key: "status", label: "Status" }
    ],
    fields: [
      { name: "title", label: "Product Title", required: true },
      { name: "slug", label: "Slug" },
      { name: "category", label: "Category", type: "select", options: solarProductCategories, required: true },
      { name: "brand", label: "Brand" },
      { name: "modelNumber", label: "Model Number" },
      { name: "shortDescription", label: "Short Description", type: "textarea" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "featuredImage", label: "Featured Image", type: "image" },
      { name: "gallery", label: "Gallery Images", type: "image", multiple: true },
      { name: "badge", label: "Badge" },
      { name: "specifications", label: "Specifications", type: "keyValue", hint: "One specification per line: Label: Value" },
      { name: "features", label: "Features", type: "repeatable", hint: "One feature per line" },
      { name: "price", label: "Price", type: "number" },
      { name: "priceLabel", label: "Price Label" },
      { name: "showPrice", label: "Show Price", type: "checkbox" },
      { name: "ctaText", label: "CTA Text" },
      { name: "ctaLink", label: "CTA Link" },
      { name: "isFeatured", label: "Featured", type: "checkbox" },
      orderField,
      activeField,
      ...seoFields
    ]
  },
  solarPromotions: {
    title: "Solar Promotions",
    endpoint: "/admin/solar-promotions",
    createLabel: "Add Solar Promotion",
    statusPatch: true,
    filterFields: [
      { name: "promotionType", label: "Promotion type", allLabel: "All promotion types", options: solarPromotionTypes },
      { name: "status", label: "Status", allLabel: "All statuses", options: activeStatus }
    ],
    columns: [
      { key: "image", label: "Image", type: "image" },
      { key: "internalName", label: "Internal Name" },
      { key: "promotionType", label: "Type" },
      { key: "startDate", label: "Start" },
      { key: "endDate", label: "End" },
      { key: "status", label: "Status" }
    ],
    fields: [
      { name: "internalName", label: "Internal Name", required: true },
      { name: "promotionType", label: "Promotion Type", type: "select", options: solarPromotionTypes, required: true },
      { name: "heading", label: "Heading", required: true },
      { name: "subHeading", label: "Sub Heading" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "highlights", label: "Highlights", type: "orderedRepeatable", hint: "One highlight per line" },
      { name: "image", label: "Desktop Image", type: "image" },
      { name: "mobileImage", label: "Mobile Image", type: "image" },
      { name: "imageAlt", label: "Image Alt Text" },
      { name: "buttonText", label: "Button Text" },
      { name: "buttonLink", label: "Button Link" },
      { name: "buttonAction", label: "Button Action", type: "select", options: solarPromotionButtonActions },
      { name: "backgroundStyle", label: "Background Style", type: "select", options: solarPromotionBackgroundStyles },
      { name: "headingColor", label: "Heading Color", type: "color" },
      { name: "buttonColor", label: "Button Color", type: "color" },
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
      orderField,
      activeField
    ]
  },
  advertisements: {
    title: "Advertisements",
    endpoint: "/admin/advertisements",
    createLabel: "Add Advertisement",
    filterByWebsite: true,
    filterFields: [
      { name: "adType", label: "Ad type", allLabel: "All ad types", options: advertisementTypes },
      { name: "status", label: "Status", allLabel: "All statuses", options: activeStatus }
    ],
    columns: [
      { key: "title", label: "Title" },
      { key: "websiteKey", label: "Website" },
      { key: "adType", label: "Type" },
      { key: "priority", label: "Priority" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "title", label: "Title", required: true },
      { name: "subtitle", label: "Subtitle" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "adType", label: "Advertisement type", type: "select", options: advertisementTypes, required: true },
      { name: "image", label: "Advertisement image", type: "image" },
      { name: "buttonText", label: "Button text" },
      { name: "buttonLink", label: "Button link" },
      { name: "startDate", label: "Start date", type: "date" },
      { name: "endDate", label: "End date", type: "date" },
      { name: "displayPages", label: "Display pages", type: "repeatable", hint: "One route per line, for example /, /solar, or *" },
      { name: "targetUrl", label: "Target URL" },
      { name: "openInNewTab", label: "Open in new tab", type: "checkbox" },
      { name: "priority", label: "Priority", type: "number" },
      { name: "showOnce", label: "Show once", type: "checkbox" },
      activeField
    ]
  }
};
