const express = require('express');
const review = express.Router();
const Review = require("../models/Review");
const mongoose = require('mongoose');
const tokenChecker = require('../tokenChecker');

  review.get("/", async (req, res) => {
    const { user_id, park_id } = req.query;
    try {
      const filter = {};

      if (user_id) {
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
          return res.status(400).json({ error: "Invalid user_id format." });
        }
        filter.user_id = mongoose.Types.ObjectId.createFromHexString(user_id);
      }

      if (park_id) {
        if (!mongoose.Types.ObjectId.isValid(park_id)) {
          return res.status(400).json({ error: "Invalid park_id format." });
        }
        filter.park_id = mongoose.Types.ObjectId.createFromHexString(park_id);
      }

      const reviewList = await Review.find(filter);
      console.log(reviewList)
        res.status(200).json(reviewList);

    } catch (err) {
      console.error("Error fetching reviews:", err);
      res.status(500).json({ error: "An error occurred while fetching reviews." });
    }
  });
  
  review.post("/", tokenChecker, async (req, res) => {
    const user_id = req.body.user_id;
    const park_id = req.body.park_id;
    const Rating = req.body.Rating;
    const Description  = req.body.Description;
  
    try { 
      if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: "Invalid or missing userID" });
      }
  
      if (!park_id || !mongoose.Types.ObjectId.isValid(park_id)) {
        return res.status(400).json({ message: "Invalid or missing parkID" });
      }
  
      if (Rating === undefined || Rating === null || typeof Rating !== "number" || Rating < 1 || Rating > 5) {
        return res.status(402).json({ message: "Invalid or missing Rating. Rating must be a number between 1 and 5" });
      }
  
      if (!Description || typeof Description !== "string" || Description.trim().length === 0) {
        return res.status(400).json({ message: "Invalid or missing Description. Description must be a non-empty string" });
      }
  
      const newReview = new Review({
        user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
        park_id: mongoose.Types.ObjectId.createFromHexString(park_id),
        Rating,
        Description: Description.trim(),
      });
  
      await newReview.save();
  
      res.status(201).json({
        message: "Review added successfully!",
        review: newReview,
      });
    } catch (err) {
      console.error("Error adding review:", err);
      res.status(500).json({ error: "Error adding review. Please try again later." });
    }
  });
  
  review.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid review ID format." });
      }

      const review = await Review.findById(id);

      if (!review) {
        return res.status(404).json({ message: "Review not found." });
      }

      res.status(200).json(review);
    } catch (err) {
      console.error("Error retrieving review:", err);
      res.status(500).json({ error: "An error occurred while retrieving the review." });
    }
  });

  review.delete("/:id", async (req, res) => {
    
    const { id } = req.params;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid review ID format." });
      }
  
      const reviewDeleted = await Review.findByIdAndDelete(id);
  
      if (!reviewDeleted) {
        return res.status(404).json({ message: "Review not found." });
      }
  
      res.status(200).json({
        message: "Review successfully deleted.",
        reviewDeleted,
      });
    } catch (err) {
      console.error("Error deleting review:", err);
      res.status(500).json({ error: "An error occurred while deleting the review." });
    }
});

module.exports = review;