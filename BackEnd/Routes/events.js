const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb');
const Event = require('../models/Event');
const Enums = require('../models/Enums');

const events = express.Router();



events.get('/', async(req, res) => {
    const { user_id, park_id, description } = req.body;

    const filter = {}

    if (user_id) {
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ error: 'Invalid user_id format.' });
        }
        filter.user_id = user_id;
    }
    if (park_id) {
        if (!mongoose.Types.ObjectId.isValid(park_id)) {
        return res.status(400).json({ error: 'Invalid park_id format.' });
        }
        filter.park_id = park_id;
    }
    if(description){
        if (!String.isValid(description)) {
            return res.status(400).json({ error: 'Invalid user_id format.' });
            }
            filter.description = description;
    }

    try{

        const events = await Events.findOne(filter);

        res.status(200).json(events);
    } catch(err) {
        res.status(500).json({ error: err.message});
    }

});

events.post('/', async (req, res) => {
    const { auth } = req.query;
    if(auth){
        const {user_id, park_id, description} = req.body;

        try{

            const newEvent = new Event({
                user_id: user_id,
                park_id: park_id,
                description: description
            });

            await newEvent.save();

            res.status(201).json({
                message: 'event successfully created', 
                event: newEvent 
            });

        } catch(err) {
            res.status(500).json({ error: err.message });
        }


    }
    else{
        res.status(401).json({ message: 'User not allowed. You must request for authorization. '});
    }
});
events.delete('/', async (req, res) => {
    //Delete by user, delete by park? I think it makes sense...
    const { a } = req.query;
    try{
        const result = await Event.deleteMany({});
    
        res.status(200).json({
          message: "All parks have been successful delete", 
          deletedCount: result.deletedCount,                // Number of events deleted
        });
      } catch(err){
        res.status(500).json({ error: err.message});
      }
});


events.update('/:id', async (req, res) =>{
    //Understand how to verify if the user is auth.
    
    const { user_level } = req.query;

    if(user_level == "Admin"){

    }
});
events.delete('/:id', async (req, res) => {

});  

