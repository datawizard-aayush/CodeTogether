const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET || "supersecretcodetogetherjwtkey", {
    expiresIn: "7d",
  });

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatarColor: user.avatarColor,
    token: generateToken(user),
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  user.isOnline = true;
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    avatarColor: user.avatarColor,
    token: generateToken(user),
  });
});

router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

module.exports = router;
