import dotenv from "dotenv";
import { verifyEmailTransport } from "../services/emailService.js";

dotenv.config();

try {
  await verifyEmailTransport();
  console.log("Brevo SMTP connection verified successfully");
  process.exit(0);
} catch (error) {
  console.error("Brevo SMTP verification failed:", error.message);
  process.exit(1);
}
