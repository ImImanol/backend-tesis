const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TouristZone",
    },
  ],
  profileIcon: {
    type: String,
    default: "/icons/icon1.png",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
