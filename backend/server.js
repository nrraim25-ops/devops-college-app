const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes"); // ✅ IMPORTANT

const app = express();

app.use(cors());
app.use(express.json());

// ✅ ADD THIS LINE (most important)
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authMiddleware = require("./middleware/authMiddleware");

const eventRoutes = require("./routes/eventRoutes");
app.use("/api/events", eventRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "You accessed protected route!", user: req.user });
});