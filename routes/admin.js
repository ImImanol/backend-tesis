const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const Province = require("../models/Province");
const City = require("../models/City");
const TouristZone = require("../models/TouristZone");

const router = express.Router();

router.use(auth, adminAuth);

// Provinces
router.post("/provinces", async (req, res) => {
  try {
    const province = new Province(req.body);
    await province.save();
    res.status(201).send(province);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error creating province", error: err.message });
  }
});

router.get("/provinces", async (req, res) => {
  try {
    const provinces = await Province.find().populate("cities");
    res.send(provinces);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching provinces", error: err.message });
  }
});

router.put("/provinces/:id", async (req, res) => {
  try {
    const province = await Province.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!province) {
      return res.status(404).send({ message: "Province not found" });
    }
    res.send(province);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error updating province", error: err.message });
  }
});

router.delete("/provinces/:id", async (req, res) => {
  try {
    const province = await Province.findByIdAndDelete(req.params.id);
    if (!province) {
      return res.status(404).send({ message: "Province not found" });
    }
    res.send(province);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting province", error: err.message });
  }
});

// Cities
router.post("/cities", async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).send(city);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error creating city", error: err.message });
  }
});

router.get("/cities", async (req, res) => {
  try {
    const cities = await City.find().populate("touristZones");
    res.send(cities);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching cities", error: err.message });
  }
});

router.put("/cities/:id", async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!city) {
      return res.status(404).send({ message: "City not found" });
    }
    res.send(city);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error updating city", error: err.message });
  }
});

router.delete("/cities/:id", async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).send({ message: "City not found" });
    }
    res.send(city);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting city", error: err.message });
  }
});

// Tourist Zones
router.post("/tourist-zones", async (req, res) => {
  try {
    const touristZone = new TouristZone(req.body);
    await touristZone.save();
    res.status(201).send(touristZone);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error creating tourist zone", error: err.message });
  }
});

router.get("/tourist-zones", async (req, res) => {
  try {
    const touristZones = await TouristZone.find();
    res.send(touristZones);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching tourist zones", error: err.message });
  }
});

router.put("/tourist-zones/:id", async (req, res) => {
  try {
    const touristZone = await TouristZone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!touristZone) {
      return res.status(404).send({ message: "Tourist zone not found" });
    }
    res.send(touristZone);
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error updating tourist zone", error: err.message });
  }
});

router.delete("/tourist-zones/:id", async (req, res) => {
  try {
    const touristZone = await TouristZone.findByIdAndDelete(req.params.id);
    if (!touristZone) {
      return res.status(404).send({ message: "Tourist zone not found" });
    }
    res.send(touristZone);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting tourist zone", error: err.message });
  }
});

module.exports = router;
