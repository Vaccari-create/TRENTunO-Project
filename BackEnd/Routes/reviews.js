const express = require('express');
const router = express.Router();
const Review = require("../models/Review");
const ObjectId = require('mongodb'); // Non so se mi servirà
const mongoose = require('mongoose'); // Non so se mi servirà

/*GET REVIEW; client/getReview
router.get("/:id", async (req, res) => {
    console.log(req.query.id);
    console.log(req.params.id);
    if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }

    try{
      const review = await Review.findById(req.query.id);
  
      if(!review){
        return res.status(400).json({messaggio: 'Review non trovata.'});
      }
  
      res.status(200).json(review);
    } catch (err){
      res.status(500).json({message: err.message});
    }
  })
  */

  router.get('/', async (req, res) => {
    res.send('get all reviews');
  })
  
  /*ADD REVIEW;   client/addReview */
router.post("/", async (req, res) => {
      const {userId, parkId, Rating, Description} = req.body;
      console.log(userId);
      console.log(typeof userId);
    try{
        const newReview = new Review({
        user_id: user_id,
        park_id: park_id,
        Rating: Rating,
        Description: Description
      });
  
      await newReview.save();
  
      res.status(200).json({
          message: 'Review added successfully!',
          review: newReview
      });
    } catch (err) {
      console.error('Error adding review: ', err);
      res.status(500).json({error: "Error ading review. "});
    }
  });
  
  
  /**REMOVE REVIEW; /client/removeReview */
  
router.delete("/:id", async (req, res) => {
    const reviewId = req.parms.id;
    try{
      console.log();
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  });


module.exports = router;