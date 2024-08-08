const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
  ],
});

const Province = mongoose.model("Province", provinceSchema);
module.exports = Province;
