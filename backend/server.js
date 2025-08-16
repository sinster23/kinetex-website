import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // adjust path if needed

dotenv.config(); // load .env variables

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
