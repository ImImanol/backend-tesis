// backend/models/TouristZone.js
const mongoose = require("mongoose");

const touristZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  category: {
    type: [String],
    enum: ["Verano", "Invierno", "Lagos", "Cerros", "Mar", "Playas"],
    required: true,
  },
});

const TouristZone = mongoose.model("TouristZone", touristZoneSchema);
module.exports = TouristZone;
