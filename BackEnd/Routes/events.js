const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/Event');

const events = express.Router();

events.get('/', async (req, res) => {
  const { user_id, park_id, status } = req.query;

  const filter = {};

  if (status !== undefined) {
    if (typeof status !== 'boolean' && status !== 'true' && status !== 'false') {
      return res.status(400).json({ error: 'Invalid status format. Must be a boolean.' });
    }
    filter.status = status === 'true' || status === true;
  }

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

  try {
    const events = await Event.find(filter);
    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found.' });
    }

    res.status(200).json(events);
  } catch (err) {
    console.error('Error retrieving events:', err);
    res.status(500).json({ error: 'An error occurred while retrieving events.' });
  }
});

events.post('/', async (req, res) => {
  const { auth } = req.query;

  if (!auth || auth !== 'true') {
    return res.status(401).json({ message: 'User not authorized. You must request authorization.' });
  }

  const { user_id, park_id, description } = req.body;

  if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ error: 'Invalid or missing user_id.' });
  }
  if (!park_id || !mongoose.Types.ObjectId.isValid(park_id)) {
    return res.status(400).json({ error: 'Invalid or missing park_id.' });
  }
  if (!description) {
    return res.status(400).json({ error: 'Description is required.' });
  }

  try {
    const newEvent = new Event({
      user_id,
      park_id,
      description,
    });

    await newEvent.save();

    res.status(201).json({
      message: 'Event successfully created',
      event: newEvent,
    });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'An error occurred while creating the event.' });
  }
});

// GET /events/:id
events.get('/:id', async (req, res) => {
    const event_id = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(event_id)) {
      return res.status(400).json({ error: 'Invalid event ID format.' });
    }
  
    try {
      const event = await Event.findById(event_id);
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found.' });
      }
  
      // Respond with the found event
      res.status(200).json(event);
    } catch (err) {
      console.error('Error retrieving event:', err);
      res.status(500).json({ error: 'An error occurred while retrieving the event.' });
    }
  });
  

events.put('/:id', async (req, res) => {
  const { event_id } = req.params;
  const { user_level } = req.query;
  const { description } = req.body;

  if (!user_level || user_level !== 'Admin') {
    return res.status(403).json({ message: 'Only admins can update events.' });
  }

  if (!mongoose.Types.ObjectId.isValid(event_id)) {
    return res.status(400).json({ error: 'Invalid event ID format.' });
  }

  if (!description) {
    return res.status(400).json({ error: 'Description is required for updates.' });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      event_id,
      { description },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    res.status(200).json({
      message: 'Event successfully updated.',
      event: updatedEvent,
    });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ error: 'An error occurred while updating the event.' });
  }
});

events.delete('/:id', async (req, res) => {
  const { event_id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid event ID format.' });
  }

  try {
    const eventDeleted = await Event.findByIdAndDelete(id);

    if (!eventDeleted) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    res.status(200).json({
      message: 'Event successfully deleted.',
      event: eventDeleted,
    });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'An error occurred while deleting the event.' });
  }
});

module.exports = events;
