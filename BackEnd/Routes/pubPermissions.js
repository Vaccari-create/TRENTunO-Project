const express = require('express');
const mongoose = require('mongoose');
const PubPermission = require('../models/PubPermission');
const tokenChecker = require('../tokenChecker');

const pubPermission = express.Router();

pubPermission.get("/", async (req, res) => {
    const { user_id } = req.query;
    const { user_level } = req.query;

    if (!user_level || user_level !== 'Admin') {
      return res.status(403).json({ message: 'Only admins can get publication permissions.' });
    }

    try {
    const filter = {};

    if (user_id) {
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
          return res.status(400).json({ error: "Invalid user_id format." });
        }
        filter.user_id = user_id;
      }

    const requests = await PubPermission.find(filter);
    if (requests.length === 0) {
      return res.status(404).json({ message: 'No publication requests found.' });
    }
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

pubPermission.post('/', tokenChecker, async (req, res) => {
    const { user_id, Description } = req.body;
  
    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ error: 'Invalid or missing user_id.' });
    }
    if (!Description || Description.trim() === '') {
      return res.status(400).json({ error: 'Description is required.' });
    }
  
    try {
      const newRequest = new PubPermission({
        user_id,
        Description,
      });
  
      await newRequest.save();
  
      res.status(201).json({
        message: 'Publication request successfully created.',
        request: newRequest,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

pubPermission.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { user_level } = req.query;

  if (!user_level || user_level !== 'Admin') {
    return res.status(403).json({ message: 'Only admins can delete publication permissions.' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid request ID format.' });
  }

  try {
    const deletedRequest = await PubPermission.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Publication request not found.' });
    }

    res.status(200).json({
      message: 'Publication request successfully deleted.',
      request: deletedRequest,
    });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while deleting the request.' });
  }
});

module.exports = pubPermission;
