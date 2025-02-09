const express = require('express');
const mongoose = require('mongoose');
const Park = require('../models/Park');
const User = require('../models/User');
const Enums = require('../models/Enums');
const tokenChecker = require('../tokenChecker');

const parks = express.Router();

/* GET PARK */

parks.get('/', async (req, res) => { 
  const { categories } = req.query;

  const filter = {}; 

  if(categories){
    try{
      const allCategories = Enums.categories.enum;

      const categoryList = Array.isArray(categories) ? categories : categories.split(',');
      
      const invalidCategories = categoryList.filter(
        (category) => !allCategories.includes(category)
      );

      if (invalidCategories.length > 0) {
        return res.status(400).json({
          error: `Invalid categories: ${invalidCategories.join(', ')}`,
        });
      }
      filter.categories = { $all: categoryList };
    } catch (err){
        return res.json(400).json({ error: "Invalid categories format. "});
    }
  }
  
  try{ 
    const parks = await Park.find(filter);

    res.status(200).json(parks);
  } catch(err) {
    res.status(500).json({ error: err.message});
  }
});

parks.post('/', tokenChecker, async (req, res) => {
  const { name, x_coord, y_coord, rating, description, categories } = req.body;
  const { adminId } = req.query;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ message: "Invalid or missing Name. It must be a non-empty string." });
  }

  if (typeof x_coord !== "number" || isNaN(x_coord)) {
    return res.status(400).json({ message: "Invalid or missing x_coord. It must be a number." });
  }
  if (typeof y_coord !== "number" || isNaN(y_coord)) {
    return res.status(400).json({ message: "Invalid or missing y_coord. It must be a number." });
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res.status(402).json({ message: "Invalid or missing Rating. It must be a number between 1 and 5." });
  }

  if (!description || typeof description !== "string" || description.trim().length === 0) {
    return res.status(400).json({ message: "Invalid or missing Description. It must be a non-empty string." });
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ message: "Invalid or missing Categories. It must be a non-empty array." });
  }

  const validCategories = Enums.categories.enum;
  const invalidCategories = categories.filter(cat => !validCategories.includes(cat));

  if (invalidCategories.length > 0) {
    return res.status(400).json({
      message: `Invalid categories: ${invalidCategories.join(', ')}. Allowed values: ${validCategories.join(', ')}.`
    });
  }

  try {
    const admin = await User.findById(adminId);
    if (!admin || admin.user_level !== "Admin") {
      return res.status(403).json({ message: "Only admins can create parks." });
    }

    const newPark = new Park({
      name,
      x_coord,
      y_coord,
      rating,
      description,
      categories,
    });

    await newPark.save();

    res.status(201).json({
      message: "Park created successfully!",
      park: newPark,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

parks.get("/:id", async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }
  
    try{
      const park = await Park.findById(id);
  
      if(!park){
        return res.status(404).json({message: 'park not found'});
      } 
        
      res.status(200).json(park);
    } catch (err){
      res.status(500).json({error: err.message});
    }
  });

  parks.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }
  
    try {
      const result = await Park.findByIdAndDelete(id);
  
      if (!result) {
        return res.status(404).json({ error: "Park not found." });
      }
  
      res.status(200).json({ message: "Park successfully deleted", deletedPark: result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = parks;