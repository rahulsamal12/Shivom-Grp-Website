import fs from "fs";
import path from "path";
import multer from "multer";

const uploadDir = path.resolve("uploads");
const resumeUploadDir = path.resolve("private_uploads", "resumes");

for (const dir of [uploadDir, resumeUploadDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const allowedResumeMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
const allowedResumeExtensions = [".pdf", ".doc", ".docx"];

const safeBaseName = (originalName, fallback = "file") => {
  const ext = path.extname(originalName).toLowerCase();
  const baseName = path
    .basename(originalName, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return { baseName: baseName || fallback, ext };
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const { baseName, ext } = safeBaseName(file.originalname, "image");
    cb(null, `${Date.now()}-${baseName}${ext}`);
  }
});

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumeUploadDir),
  filename: (req, file, cb) => {
    const { baseName, ext } = safeBaseName(file.originalname, "resume");
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${baseName}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(new Error("Only image files are allowed"), false);
    return;
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const resumeFileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname || "").toLowerCase();
  if (!allowedResumeMimeTypes.includes(file.mimetype) || !allowedResumeExtensions.includes(ext)) {
    cb(new Error("Only PDF, DOC, or DOCX resume files are allowed"), false);
    return;
  }
  cb(null, true);
};

export const resumeUpload = multer({
  storage: resumeStorage,
  fileFilter: resumeFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export const resumeUploadRoot = resumeUploadDir;
