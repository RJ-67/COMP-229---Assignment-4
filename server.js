import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import config from "./config/config.js";
import app from "./server/express.js";

// --- SINGLE CLEAN MONGOOSE CONNECTION ---
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// --- DEFAULT ROUTE ---
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// --- START SERVER ---
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
