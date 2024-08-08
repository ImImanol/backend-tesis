// backend/routes/touristZones.js
const express = require("express");
const TouristZone = require("../models/TouristZone");
const router = express.Router();

// Get all tourist zones of a city
router.get("/city/:cityId", async (req, res) => {
  try {
    const filters = req.query;
    const query = { city: req.params.cityId, ...filters };

    const touristZones = await TouristZone.find(query);
    res.json(touristZones);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Get a tourist zone by ID
router.get("/:id", async (req, res) => {
  try {
    const touristZone = await TouristZone.findById(req.params.id).populate(
      "city"
    );
    if (!touristZone) {
      return res.status(404).json({ message: "Tourist zone not found" });
    }
    res.json(touristZone);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;
