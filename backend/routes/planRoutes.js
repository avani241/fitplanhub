import express from "express";
import Plan from "../models/Plan.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to authenticate
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Create Plan (Trainer Only)
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "trainer") return res.status(403).json({ message: "Access denied" });
  try {
    const plan = new Plan({ ...req.body, trainerId: req.user.id });
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Plans (Public)
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find().populate("trainerId", "name");
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Feed (Subscribed / Followed Trainers)
router.get("/user/feed", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("following");
    const plans = await Plan.find({ trainerId: { $in: user.following } }).populate("trainerId", "name");
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
