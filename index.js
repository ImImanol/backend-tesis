// backend/index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path"); // Importar path para manejar las rutas
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

// Middleware para permitir solicitudes CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Configurar multer para manejar las subidas de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán los archivos subidos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo para evitar conflictos
  },
});

const upload = multer({ storage });

//post
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
// Configurar para servir archivos estáticos desde el directorio 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files from the uploads folder
app.use("/uploads", express.static("uploads"));

// Example of a protected route
app.get("/protected", auth, (req, res) => {
  res.send("This is a protected route");
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello Sur360");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
