const express = require("express");
const User = require("../models/User");
const TouristZone = require("../models/TouristZone");
const { auth } = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Add a tourist zone to favorites
router.post("/favorites", auth, async (req, res) => {
  try {
    const { zoneId } = req.body;
    const userId = req.user._id;

    // Verificar que la zona turística exista
    const touristZone = await TouristZone.findById(zoneId);
    if (!touristZone) {
      return res.status(404).json({ message: "Tourist zone not found" });
    }

    // Agregar la zona turística a los favoritos del usuario
    await User.findByIdAndUpdate(userId, { $addToSet: { favorites: zoneId } });
    res.status(200).json({ message: "Added to favorites" });
  } catch (err) {
    console.error("Error adding favorite", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

router.get("/favorites", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    console.error("Error fetching user favorites", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Remove a tourist zone from favorites
router.delete("/favorites/:zoneId", auth, async (req, res) => {
  try {
    const { zoneId } = req.params;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, { $pull: { favorites: zoneId } });
    res.status(200).json({ message: "Removed from favorites" });
  } catch (err) {
    console.error("Error removing favorite", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, email, profileIcon } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, profileIcon },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (err) {
    console.error("Error updating user profile", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// Actualizar contraseña de usuario
router.put("/update-password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
});

module.exports = router;
