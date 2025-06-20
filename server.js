const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mongoose model
const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Submission = mongoose.model("Submission", submissionSchema);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// POST route for form submission
app.post("/submit-form", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newSubmission = new Submission({ name, email, message });
    await newSubmission.save();
    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("❌ Error saving to DB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Optional: test GET route
app.get("/", (req, res) => {
  res.send("🚀 Contact form backend is live");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
