const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb');
const Park = require('../models/Park');

const parks = express.Router();

/* GET PARK */

parks.get('/', async (req, res) => {
  
})


parks.get("/:id", async (req, res) => {
    
    const parkId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(parkId)) {
      return res.status(400).json({ error: 'Invalid ID format.' });
    }
  
    try{
      const park = await Park.findById(parkId);
  
      if(!park){
        return res.status(400).json({message: 'Parco non trovato.'});
      } 
        
      res.status(200).json(park);
    } catch (err){
      res.status(500).json({error: err.message});
    }
  });


  parks.post('/create', async (req, res) => {
      const {name, x_coord, y_coord, categories, rating, description, services} = req.body;

      try {
        const newPark = new Park({
          name: name, 
          x_coord: x_coord, 
          y_coord: y_coord, 
          categories: categories, 
          rating: rating, 
          description: description, 
          services: services
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

  module.exports = parks;