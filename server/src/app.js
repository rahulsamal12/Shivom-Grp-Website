import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
  "https://shivom.visital.co.in",
  "https://adminshivom.visital.co.in",
  "https://shivomgroup.in",
  "https://www.shivomgroup.in",
  "https://admin.shivomgroup.in",
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
].filter(Boolean);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts, please try again later" }
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many contact submissions, please try again later" }
});

const careerApplyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many career applications, please try again later" }
});

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use("/uploads", express.static(path.resolve("uploads")));

// Root route — returns API status (prevents "Not found - /" error in panel)
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Shivom Group API Server is running",
    status: "online",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    uptime: `${Math.floor(process.uptime())}s`
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    status: "healthy",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    data: { uptime: process.uptime() }
  });
});

app.use("/api/admin/auth", authLimiter, authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", (req, res, next) => {
  if (req.method === "POST" && req.path.endsWith("/contact")) return contactLimiter(req, res, next);
  const isCareerApplication =
    req.method === "POST" &&
    ((req.path.includes("/careers/") && req.path.endsWith("/apply")) ||
      req.path.endsWith("/career-applications"));
  if (isCareerApplication) return careerApplyLimiter(req, res, next);
  next();
}, publicRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
