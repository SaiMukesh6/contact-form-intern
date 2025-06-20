// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env variables
dotenv.config();

// Create Express app
const app = express();

// Middleware to allow JSON and CORS
app.use(cors());
app.use(express.json());

// Define Mongoose schema and model
const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Submission = mongoose.model("Submission", submissionSchema);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Root route for testing
app.get("/", (req, res) => {
  res.send("🚀 Contact form backend is live");
});

// Form submission route
app.post("/submit-form", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newSubmission = new Submission({ name, email, message });
    await newSubmission.save();
    console.log("✅ Form data saved:", req.body);
    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("❌ Error saving form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
