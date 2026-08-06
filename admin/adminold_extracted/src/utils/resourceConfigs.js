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

const awardCertificationType = [
  { value: "award", label: "Award" },
  { value: "certification", label: "Certification" }
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
      { name: "description", label: "Description", type: "textarea" },
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
      { name: "location", label: "Location" },
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
      { key: "issuer", label: "Issuer" },
      { key: "status", label: "Status" }
    ],
    fields: [
      websiteField,
      { name: "title", label: "Title", required: true },
      { name: "slug", label: "Slug" },
      { name: "type", label: "Type", type: "select", options: awardCertificationType, required: true },
      { name: "issuer", label: "Issuing authority" },
      { name: "certificateNumber", label: "Certificate number" },
      { name: "issueDate", label: "Issue date", type: "date" },
      { name: "expiryDate", label: "Expiry date", type: "date" },
      { name: "shortDescription", label: "Short description", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Award / certificate image", type: "image" },
      { name: "documentUrl", label: "Document URL" },
      { name: "isFeatured", label: "Featured", type: "checkbox" },
      orderField,
      activeField,
      ...seoFields
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
  }
};
