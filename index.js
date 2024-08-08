require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const provincesRoutes = require("./routes/provinces");
const citiesRoutes = require("./routes/cities");
const touristZonesRoutes = require("./routes/touristZones");
const commentRoutes = require("./routes/comment");
const { auth, adminAuth } = require("./middleware/auth");
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });

// Use the authentication routes
app.use("/auth", authRoutes);
app.use("/admin", auth, adminAuth, adminRoutes);
app.use("/user", auth, userRoutes);
app.use("/provinces", provincesRoutes);
app.use("/cities", citiesRoutes);
app.use("/tourist-zones", touristZonesRoutes, commentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/protected", auth, (req, res) => {
  res.send("This is a protected route");
});

app.get("/", (req, res) => {
  res.send("Hello Sur360");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
