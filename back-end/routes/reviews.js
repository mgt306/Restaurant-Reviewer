const router = require("express").Router();
const Review = require("../models/Review");

// creating pins 
router.post("/", async (req, res) => {
  const newReview = new Review(req.body);
  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

// fetching all pins
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;