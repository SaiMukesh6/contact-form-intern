// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB error:", err));

// Schema
const Submission = mongoose.model("Submission", new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}));

// API endpoint
app.post("/submit-form", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    await Submission.create({ name, email, message });
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
