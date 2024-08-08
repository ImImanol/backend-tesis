const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
    required: true,
  },
  touristZones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TouristZone",
    },
  ],
});

const City = mongoose.model("City", citySchema);
module.exports = City;
