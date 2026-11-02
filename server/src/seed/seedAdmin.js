import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";
import Website from "../models/Website.js";
import Slider from "../models/Slider.js";
import Page from "../models/Page.js";
import LandingSection from "../models/LandingSection.js";
import Project from "../models/Project.js";
import Testimonial from "../models/Testimonial.js";
import Blog from "../models/Blog.js";
import Event from "../models/Event.js";
import TeamMember from "../models/TeamMember.js";
import ContactEnquiry from "../models/ContactEnquiry.js";
import AwardCertification from "../models/AwardCertification.js";
import Career from "../models/Career.js";
import CareerApplication from "../models/CareerApplication.js";
import Advertisement from "../models/Advertisement.js";
import ClientPartner from "../models/ClientPartner.js";
import SolarProduct from "../models/SolarProduct.js";
import SolarPromotion from "../models/SolarPromotion.js";
import slugify from "../utils/slugify.js";

dotenv.config();

const websites = [
  {
    websiteKey: "group",
    websiteName: "Group Website",
    primaryColor: "#0f766e",
    secondaryColor: "#1f2937",
    metaTitle: "Shivom Group",
    metaDescription: "Official group website CMS content",
    contactEmail: "info@example.com",
    contactPhone: "+91 00000 00000",
    address: "Plot No. 41, Sect. A, Zone B, Near KTM Showroom, Mancheswar, Bhubaneswar – 751010, Odisha, India"
  },
  {
    websiteKey: "solar",
    websiteName: "Solar",
    primaryColor: "#f59e0b",
    secondaryColor: "#0f766e",
    metaTitle: "Solar Solutions"
  },
  {
    websiteKey: "concrete",
    websiteName: "Concrete",
    primaryColor: "#52525b",
    secondaryColor: "#0f766e",
    metaTitle: "Concrete Solutions"
  },
  {
    websiteKey: "enterprise",
    websiteName: "Enterprises",
    primaryColor: "#dc2626",
    secondaryColor: "#111827",
    metaTitle: "Enterprises"
  }
];

const pageSlugs = [
  ["home", "Home"],
  ["about-us", "About Us"],
  ["companies", "Companies"],
  ["projects", "Projects"],
  ["events", "Events"],
  ["team", "Team"],
  ["blog", "Blog / Recent News"],
  ["contact-us", "Contact Us"]
];

const runSeed = async () => {
  await connectDB();

  const websiteKeyModels = [
    Slider,
    Page,
    LandingSection,
    Project,
    Testimonial,
    Blog,
    Event,
    AwardCertification,
    TeamMember,
    ContactEnquiry,
    Career,
    CareerApplication,
    Advertisement,
    ClientPartner,
    SolarProduct,
    SolarPromotion
  ];
  const enterpriseWebsite = await Website.findOne({ websiteKey: "enterprise" });
  const fabricationWebsite = await Website.findOne({ websiteKey: "fabrication" });

  if (fabricationWebsite && !enterpriseWebsite) {
    fabricationWebsite.websiteKey = "enterprise";
    fabricationWebsite.websiteName = "Enterprises";
    fabricationWebsite.metaTitle = fabricationWebsite.metaTitle || "Enterprises";
    await fabricationWebsite.save();
  } else if (fabricationWebsite && enterpriseWebsite) {
    await Website.deleteOne({ websiteKey: "fabrication" });
  }

  await Promise.all(
    websiteKeyModels.map((Model) =>
      Model.updateMany({ websiteKey: "fabrication" }, { $set: { websiteKey: "enterprise" } })
    )
  );
  console.log("Legacy fabrication website key migrated to enterprise");

  const email = process.env.SUPER_ADMIN_EMAIL || "admin@example.com";
  const password = process.env.SUPER_ADMIN_PASSWORD || "change_this_password";

  const adminCount = await Admin.countDocuments();
  if (!adminCount) {
    await Admin.create({
      name: "Super Admin",
      email,
      password,
      role: "super_admin",
      status: "active"
    });
    console.log(`Super admin created: ${email}`);
  } else {
    console.log("Admin already exists, skipping admin seed");
  }

  await Website.bulkWrite(
    websites.map((website) => ({
      updateOne: {
        filter: { websiteKey: website.websiteKey },
        update: { $setOnInsert: { ...website, status: "active" } },
        upsert: true
      }
    }))
  );
  console.log("Default websites seeded");

  for (const website of websites) {
    const exists = await Slider.exists({ websiteKey: website.websiteKey });
    if (!exists) {
      await Slider.create({
        websiteKey: website.websiteKey,
        title: `${website.websiteName} Hero`,
        subtitle: "Welcome",
        description: "Edit this hero content from the admin panel.",
        buttonText: "Explore",
        buttonLink: "/",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
        order: 1,
        status: "active"
      });
    }
  }
  console.log("Sample sliders seeded");

  for (const [slug, title] of pageSlugs) {
    await Page.updateOne(
      { websiteKey: "group", slug },
      {
        $setOnInsert: {
          websiteKey: "group",
          slug,
          title,
          metaTitle: title,
          sections: [
            {
              sectionKey: "intro",
              heading: title,
              subHeading: "CMS managed content",
              description: "Use the admin panel to update this page section.",
              order: 1,
              status: "active"
            }
          ],
          status: "active"
        }
      },
      { upsert: true }
    );
  }
  console.log("Group pages seeded");

  for (const websiteKey of ["solar", "concrete", "enterprise"]) {
    const exists = await LandingSection.exists({ websiteKey });
    if (!exists) {
      await LandingSection.insertMany([
        {
          websiteKey,
          sectionType: "about",
          heading: `About ${websiteKey}`,
          description: "Editable landing page content for this company.",
          order: 1,
          status: "active",
          items: []
        },
        {
          websiteKey,
          sectionType: "services",
          heading: "Services",
          description: "Add service cards using the items JSON field.",
          order: 2,
          status: "active",
          items: [
            {
              title: "Consulting",
              description: "Sample service item"
            }
          ]
        }
      ]);
    }
  }
  console.log("Landing sections seeded");

  if (!(await Project.exists({ websiteKey: "group" }))) {
    await Project.create({
      websiteKey: "group",
      title: "Sample Group Project",
      shortDescription: "A sample featured project.",
      description: "Edit or delete this sample project from the admin panel.",
      category: "Infrastructure",
      location: "Odisha",
      projectDate: new Date(),
      featuredImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      status: "active",
      isFeatured: true,
      order: 1
    });
  }

  if (!(await Testimonial.exists({ websiteKey: "group" }))) {
    await Testimonial.create({
      websiteKey: "group",
      clientName: "Sample Client",
      designation: "Director",
      companyName: "Partner Company",
      message: "This CMS makes website content easy to maintain.",
      rating: 5,
      order: 1,
      status: "active"
    });
  }

  if (!(await AwardCertification.exists({ websiteKey: "group", type: "certification" }))) {
    await AwardCertification.create({
      websiteKey: "group",
      title: "ISO 9001 Quality Certification",
      type: "certification",
      issuer: "International Certification Body",
      certificateNumber: "ISO-9001-SAMPLE",
      issueDate: new Date(),
      shortDescription: "Sample quality certification record.",
      description: "Edit or delete this sample certification from the admin panel.",
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80",
      status: "active",
      isFeatured: true,
      order: 1,
      metaTitle: "ISO 9001 Quality Certification",
      metaDescription: "Sample awards and certifications CMS record"
    });
  }

  if (!(await AwardCertification.exists({ websiteKey: "group", type: "award" }))) {
    await AwardCertification.create({
      websiteKey: "group",
      title: "Top Taxpayer Award",
      type: "award",
      issuer: "Government Authority",
      issueDate: new Date(),
      shortDescription: "Sample award record.",
      description: "Edit or delete this sample award from the admin panel.",
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80",
      status: "active",
      isFeatured: true,
      order: 2,
      metaTitle: "Top Taxpayer Award",
      metaDescription: "Sample award CMS record"
    });
  }

  if (!(await Blog.exists({ websiteKey: "group" }))) {
    await Blog.create({
      websiteKey: "group",
      title: "Welcome to the CMS",
      shortDescription: "Sample published news item.",
      content: "Update this article from the admin panel.",
      category: "News",
      tags: ["cms", "news"],
      author: "Admin",
      publishDate: new Date(),
      status: "published",
      isFeatured: true
    });
  }
  console.log("Sample project, testimonial, award/certification, and blog seeded");

  const sampleCareers = [
    {
      websiteKey: "group",
      jobTitle: "Business Development Manager",
      department: "Sales",
      jobType: "full-time",
      location: "Odisha",
      experience: "5+ years",
      salaryRange: "As per industry standards",
      shortDescription: "Lead new partnerships and group-level growth opportunities.",
      description: "Manage client relationships, identify market opportunities, and support strategic growth for the group.",
      responsibilities: ["Build a sales pipeline", "Coordinate with company teams", "Prepare business proposals"],
      requirements: ["Graduate degree", "Strong communication skills", "Experience in B2B sales"],
      skills: ["Sales", "Negotiation", "CRM"],
      applyEmail: "careers@example.com",
      status: "active",
      order: 1
    },
    {
      websiteKey: "group",
      jobTitle: "Digital Marketing Executive",
      department: "Marketing",
      jobType: "full-time",
      location: "Bhubaneswar",
      experience: "2+ years",
      shortDescription: "Manage website campaigns, social media, and content updates.",
      description: "Plan and execute digital campaigns for group and company websites.",
      responsibilities: ["Manage campaign calendar", "Coordinate content publishing", "Track campaign performance"],
      requirements: ["Digital marketing experience", "Basic SEO knowledge"],
      skills: ["SEO", "Social media", "Content"],
      applyEmail: "careers@example.com",
      status: "active",
      order: 2
    },
    {
      websiteKey: "solar",
      jobTitle: "Solar Site Engineer",
      department: "Operations",
      jobType: "full-time",
      location: "Project sites",
      experience: "3+ years",
      shortDescription: "Supervise solar project installation and commissioning.",
      description: "Coordinate installation teams and maintain project quality standards.",
      responsibilities: ["Site supervision", "Quality checks", "Client coordination"],
      requirements: ["Electrical engineering background", "Solar project experience"],
      skills: ["Solar EPC", "Site management"],
      applyEmail: "solarcareers@example.com",
      status: "active",
      order: 1
    },
    {
      websiteKey: "concrete",
      jobTitle: "Concrete Plant Supervisor",
      department: "Production",
      jobType: "full-time",
      location: "Plant location",
      experience: "4+ years",
      shortDescription: "Oversee daily batching plant operations.",
      description: "Ensure production quality, dispatch planning, and plant safety compliance.",
      responsibilities: ["Manage production schedule", "Monitor quality", "Maintain safety checklist"],
      requirements: ["Concrete plant experience", "Team handling ability"],
      skills: ["Batching plant", "Production planning"],
      applyEmail: "concretecareers@example.com",
      status: "active",
      order: 1
    },
    {
      websiteKey: "enterprise",
      jobTitle: "Enterprise Operations Coordinator",
      department: "Operations",
      jobType: "contract",
      location: "Odisha",
      experience: "2+ years",
      shortDescription: "Coordinate enterprise operations and vendor follow-ups.",
      description: "Support operations, documentation, vendor coordination, and reporting.",
      responsibilities: ["Vendor follow-up", "Document tracking", "Operations reporting"],
      requirements: ["Operations experience", "MS Office proficiency"],
      skills: ["Coordination", "Reporting"],
      applyEmail: "enterprisecareers@example.com",
      status: "active",
      order: 1
    }
  ];

  const careersWithoutSlug = await Career.find({
    $or: [{ slug: null }, { slug: { $exists: false } }]
  });
  for (const career of careersWithoutSlug) {
    if (career.jobTitle) {
      career.slug = slugify(career.jobTitle);
      await career.save();
    }
  }

  for (const career of sampleCareers) {
    career.slug = slugify(career.slug || career.jobTitle);
    await Career.updateOne(
      { websiteKey: career.websiteKey, slug: career.slug },
      { $setOnInsert: career },
      { upsert: true }
    );
  }

  const now = new Date();
  const nextMonth = new Date(now);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const sampleAdvertisements = [
    {
      websiteKey: "group",
      title: "Visit Shivom Group",
      subtitle: "Latest updates",
      description: "Explore new projects, awards, and announcements from Shivom Group.",
      adType: "popup",
      buttonText: "Explore",
      buttonLink: "/projects",
      startDate: now,
      endDate: nextMonth,
      displayPages: ["/"],
      priority: 10,
      status: "active",
      showOnce: true
    },
    {
      websiteKey: "solar",
      title: "Solar Solutions Consultation",
      subtitle: "Book a discussion",
      description: "Speak with the Shivom Solar team for renewable energy project planning.",
      adType: "top-banner",
      buttonText: "Contact",
      buttonLink: "/contact",
      startDate: now,
      endDate: nextMonth,
      displayPages: ["/solar"],
      priority: 5,
      status: "active"
    },
    {
      websiteKey: "group",
      title: "Browser Update Recommended",
      subtitle: "For the best experience",
      description: "Please update your browser if this website does not display correctly.",
      adType: "browser-update",
      buttonText: "Update Browser",
      buttonLink: "https://browsehappy.com/",
      startDate: now,
      endDate: nextMonth,
      displayPages: ["*"],
      targetUrl: "https://browsehappy.com/",
      openInNewTab: true,
      priority: 100,
      status: "active"
    }
  ];

  for (const advertisement of sampleAdvertisements) {
    await Advertisement.updateOne(
      { websiteKey: advertisement.websiteKey, title: advertisement.title, adType: advertisement.adType },
      { $setOnInsert: advertisement },
      { upsert: true }
    );
  }
  console.log("Sample careers and advertisements seeded");

  const sampleClientPartners = [
    {
      websiteKey: "group",
      name: "TPWODL",
      logo: "https://dummyimage.com/260x140/ffffff/0072bc.png&text=TPWODL",
      websiteUrl: "",
      description: "Power distribution client",
      type: "client",
      order: 1,
      status: "active"
    },
    {
      websiteKey: "group",
      name: "PGCIL",
      logo: "https://dummyimage.com/260x140/ffffff/1f3c88.png&text=PGCIL",
      websiteUrl: "",
      description: "Power grid client",
      type: "client",
      order: 2,
      status: "active"
    },
    {
      websiteKey: "group",
      name: "Odisha Lift Irrigation Corporation",
      logo: "https://dummyimage.com/260x140/ffffff/111111.png&text=OLIC",
      websiteUrl: "",
      description: "Infrastructure partner",
      type: "partner",
      order: 3,
      status: "active"
    },
    {
      websiteKey: "solar",
      name: "Tata Power Solar",
      logo: "https://dummyimage.com/260x140/ffffff/0b65c2.png&text=TATA+POWER+SOLAR",
      websiteUrl: "",
      description: "Solar partner",
      type: "partner",
      order: 1,
      status: "active"
    },
    {
      websiteKey: "enterprise",
      name: "Bajaj Electricals",
      logo: "https://dummyimage.com/260x140/ffffff/003f88.png&text=BAJAJ",
      websiteUrl: "",
      description: "Enterprise client",
      type: "client",
      order: 1,
      status: "active"
    }
  ];

  for (const item of sampleClientPartners) {
    await ClientPartner.updateOne(
      { websiteKey: item.websiteKey, name: item.name, type: item.type },
      { $setOnInsert: item },
      { upsert: true }
    );
  }
  console.log("Sample clients and partners seeded");

  if (!(await SolarProduct.exists({ websiteKey: "solar" }))) {
    await SolarProduct.insertMany([
      {
        websiteKey: "solar",
        title: "Mono PERC Solar Panel 540W",
        slug: "mono-perc-solar-panel-540w",
        category: "solar-panel",
        brand: "Shivom Solar",
        modelNumber: "SS-MP-540",
        shortDescription: "High-efficiency solar panel for residential and commercial rooftops.",
        description: "A durable Mono PERC module designed for strong output, lower degradation, and dependable rooftop performance.",
        featuredImage: "https://dummyimage.com/900x600/fff7ed/f59e0b.png&text=Solar+Panel",
        badge: "Best Seller",
        specifications: [
          { label: "Wattage", value: "540W" },
          { label: "Cell type", value: "Mono PERC" },
          { label: "Warranty", value: "25 years performance warranty" }
        ],
        features: ["High conversion efficiency", "Weather-resistant frame", "Low maintenance"],
        priceLabel: "Contact for pricing",
        showPrice: false,
        ctaText: "Enquire Now",
        ctaLink: "/contact",
        isFeatured: true,
        order: 1,
        status: "active",
        metaTitle: "Mono PERC Solar Panel 540W",
        metaDescription: "Sample solar panel product managed from the CMS"
      },
      {
        websiteKey: "solar",
        title: "Residential Rooftop Solar Kit",
        slug: "residential-rooftop-solar-kit",
        category: "rooftop-kit",
        brand: "Shivom Solar",
        modelNumber: "SS-RTK-5KW",
        shortDescription: "Complete rooftop solar solution for homes.",
        description: "A bundled solar kit for residential rooftops including modules, inverter, mounting, and installation support.",
        featuredImage: "https://dummyimage.com/900x600/ecfeff/0f766e.png&text=Rooftop+Solar+Kit",
        badge: "Featured",
        specifications: [
          { label: "System size", value: "5kW" },
          { label: "Application", value: "Residential" }
        ],
        features: ["End-to-end installation", "Custom roof assessment", "After-sales support"],
        priceLabel: "Scheme pricing available",
        showPrice: false,
        ctaText: "Check Eligibility",
        ctaLink: "/contact",
        isFeatured: true,
        order: 2,
        status: "active"
      }
    ]);
  }

  if (!(await SolarPromotion.exists({ websiteKey: "solar" }))) {
    await SolarPromotion.insertMany([
      {
        websiteKey: "solar",
        internalName: "Residential Solar Subsidy Awareness",
        promotionType: "government-scheme",
        heading: "Solar Subsidy Assistance",
        subHeading: "Government scheme guidance",
        description: "Help customers understand rooftop solar subsidy options and the steps required for application.",
        highlights: [
          { text: "Eligibility guidance for residential rooftops", order: 1 },
          { text: "Documentation and application support", order: 2 },
          { text: "Site survey and system recommendation", order: 3 }
        ],
        image: "https://dummyimage.com/900x500/fff7ed/f97316.png&text=Solar+Scheme",
        imageAlt: "Solar subsidy scheme",
        buttonText: "Ask About Scheme",
        buttonLink: "/contact",
        buttonAction: "scheme-enquiry",
        backgroundStyle: "light",
        order: 1,
        startDate: now,
        endDate: nextMonth,
        status: "active"
      },
      {
        websiteKey: "solar",
        internalName: "Free Solar Consultation",
        promotionType: "offer",
        heading: "Book a Free Solar Consultation",
        subHeading: "For homes and businesses",
        description: "Get an initial rooftop and load assessment from the Shivom Solar team.",
        highlights: [
          { text: "No-obligation consultation", order: 1 },
          { text: "Customized system sizing", order: 2 }
        ],
        image: "https://dummyimage.com/900x500/f0fdf4/0f766e.png&text=Solar+Consultation",
        imageAlt: "Solar consultation offer",
        buttonText: "Book Now",
        buttonLink: "/contact",
        buttonAction: "contact-form",
        backgroundStyle: "white",
        order: 2,
        startDate: now,
        endDate: nextMonth,
        status: "active"
      }
    ]);
  }
  console.log("Sample solar products and promotions seeded");

  await mongoose.connection.close();
  console.log("Seed completed");
};

runSeed().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
