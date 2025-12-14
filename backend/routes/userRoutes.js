const express = require("express");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const Plan = require("../models/Plan");
const Subscription = require("../models/Subscription");

const router = express.Router();

// SUBSCRIBE TO PLAN
router.post("/subscribe/:planId", auth, async (req, res) => {
  await Subscription.create({
    userId: req.user.id,
    planId: req.params.planId
  });

  res.json({ message: "Subscription successful" });
});

// FOLLOW TRAINER
router.post("/follow/:trainerId", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $addToSet: { followingTrainers: req.params.trainerId }
  });

  res.json({ message: "Trainer followed" });
});

// UNFOLLOW TRAINER
router.post("/unfollow/:trainerId", auth, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { followingTrainers: req.params.trainerId }
  });

  res.json({ message: "Trainer unfollowed" });
});

// USER FEED
router.get("/feed", auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  const plans = await Plan.find({
    trainerId: { $in: user.followingTrainers }
  }).populate("trainerId", "name");

  res.json(plans);
});

module.exports = router;
