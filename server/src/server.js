import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("  ✅  Shivom Group API — Server is RUNNING");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log(`  🌐  URL         : http://localhost:${PORT}`);
      console.log(`  🔗  Health check: http://localhost:${PORT}/api/health`);
      console.log(`  🌍  Environment : ${process.env.NODE_ENV || "development"}`);
      console.log(`  📅  Started at  : ${new Date().toISOString()}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });
  })
  .catch((error) => {
    console.error("❌  Server failed to start:", error.message);
    process.exit(1);
  });
