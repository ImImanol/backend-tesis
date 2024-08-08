const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ message: "Invalid token" });
  }
};

const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Access denied" });
  }
  next();
};

module.exports = { auth, adminAuth };
