// backend/routes/provinces.js
const express = require("express");
const Province = require("../models/Province");
const City = require("../models/City");
const router = express.Router();

// Get all provinces
router.get("/", async (req, res) => {
  try {
    const provinces = await Province.find().populate("cities");
    res.json(provinces);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Obtener todas las ciudades de una provincia específica
router.get("/:provinceId/cities", async (req, res) => {
  const { provinceId } = req.params;
  try {
    const cities = await City.find({ province: provinceId });
    res.json(cities);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Get a province by ID
router.get("/:id", async (req, res) => {
  try {
    const province = await Province.findById(req.params.id).populate("cities");
    if (!province) {
      return res.status(404).json({ message: "Province not found" });
    }
    res.json(province);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;
