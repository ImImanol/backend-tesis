// backend/routes/cities.js
const express = require("express");
const City = require("../models/City");
const TouristZone = require("../models/TouristZone");
const router = express.Router();

// Get all cities of a province
router.get("/province/:provinceId", async (req, res) => {
  try {
    const cities = await City.find({
      province: req.params.provinceId,
    }).populate("touristZones");
    res.json(cities);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Obtener todas las zonas turísticas de una ciudad específica
router.get("/:cityId/tourist-zones", async (req, res) => {
  const { cityId } = req.params;
  try {
    const touristZones = await TouristZone.find({ city: cityId });
    res.json(touristZones);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Get a city by ID
router.get("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate("touristZones");
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    res.json(city);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;
