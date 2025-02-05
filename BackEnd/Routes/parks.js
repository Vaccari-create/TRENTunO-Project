const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb');
const Park = require('../models/Park');
const Enums = require('../models/Enums');
const tokenChecker = require('../tokenChecker');

const parks = express.Router();

/* GET PARK */

parks.get('/', async (req, res) => { 
  const { categories } = req.query;

  const filter = {}; 

  if(categories){
    try{
      // Extract the valid categories from Enums
      const allCategories = Enums.categories.enum;

      // Transform the categories into an array if the elements are separated by a commas
      const categoryList = Array.isArray(categories) ? categories : categories.split(',');

      // Validate each category against the valid categories
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
  const {name, x_coord, y_coord, rating, description, categories} = req.body;

  try {
    const newPark = new Park({
      name: name, 
      x_coord: x_coord, 
      y_coord: y_coord,  
      rating: rating, 
      description: description, 
      categories: categories
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

parks.delete('/', async (req, res) => {
  try{
    const result = await Park.deleteMany({});

    res.status(200).json({
      message: "All parks have been successful delete", 
      deletedCount: result.deletedCount,                // Number of parks deleted
    });
  } catch(err){
    res.status(500).json({ error: err.message});
  }
});


parks.get("/:id", async (req, res) => {
    
    const parkId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(parkId)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }
  
    try{
      const park = await Park.findById(parkId);
  
      if(!park){
        return res.status(404).json({message: 'park not found'});
      } 
        
      res.status(200).json(park);
    } catch (err){
      res.status(500).json({error: err.message});
    }
  });

  parks.delete("/:id", async (req, res) => {
    const parkId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(parkId)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }
  
    try {
      const result = await Park.findByIdAndDelete(parkId);
  
      if (!result) {
        return res.status(404).json({ error: "Park not found." });
      }
  
      res.status(200).json({ message: "Park successfully deleted", deletedPark: result });
    } catch (err) {
      // Handle server errors
      res.status(500).json({ error: err.message });
    }
  });

  module.exports = parks;