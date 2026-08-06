import mongoose from "mongoose";
import { CAREER_APPLICATION_STATUSES, INTERVIEW_MODES, WEBSITE_KEYS } from "../utils/constants.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const actionHistorySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true
    },
    oldStatus: String,
    newStatus: String,
    remarks: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    },
    performedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const careerApplicationSchema = new mongoose.Schema(
  {
    websiteKey: {
      type: String,
      enum: WEBSITE_KEYS,
      required: [true, "Website key is required"],
      index: true
    },
    careerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Career",
      required: [true, "Career is required"],
      index: true
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true
    },
    jobSlug: {
      type: String,
      required: [true, "Job slug is required"],
      trim: true,
      lowercase: true,
      index: true
    },
    applicantName: {
      type: String,
      required: [true, "Applicant name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [emailRegex, "Please provide a valid email"]
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true
    },
    alternatePhone: String,
    currentLocation: String,
    totalExperience: String,
    currentCompany: String,
    currentSalary: String,
    expectedSalary: String,
    noticePeriod: String,
    coverLetter: String,
    message: String,
    resumeUrl: {
      type: String,
      required: [true, "Resume URL is required"]
    },
    resumePath: String,
    resumeOriginalName: {
      type: String,
      required: [true, "Resume original name is required"]
    },
    resumeMimeType: {
      type: String,
      required: [true, "Resume MIME type is required"]
    },
    resumeSize: {
      type: Number,
      required: [true, "Resume size is required"]
    },
    resume: String,
    status: {
      type: String,
      enum: CAREER_APPLICATION_STATUSES,
      default: "new",
      index: true
    },
    adminRemarks: String,
    rejectionReason: String,
    interviewDate: Date,
    interviewMode: {
      type: String,
      enum: INTERVIEW_MODES
    },
    interviewLink: String,
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    },
    reviewedAt: Date,
    actionHistory: {
      type: [actionHistorySchema],
      default: []
    },
    sourcePage: String,
    ipAddress: String,
    userAgent: String
  },
  { timestamps: true }
);

careerApplicationSchema.index({ websiteKey: 1, status: 1, createdAt: -1 });
careerApplicationSchema.index({ careerId: 1, createdAt: -1 });
careerApplicationSchema.index({ email: 1, careerId: 1 });
careerApplicationSchema.index({ jobSlug: 1, createdAt: -1 });

export default mongoose.model("CareerApplication", careerApplicationSchema);
