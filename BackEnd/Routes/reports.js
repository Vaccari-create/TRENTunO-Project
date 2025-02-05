const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb');
const Report = require('../models/Report');
const tokenChecker = require('../tokenChecker');


const reports = express.Router();

reports.get('/', async (req, res) => {
    const { user_id, park_id } = req.query;
  
    const filter = {};
    if (user_id) {
      if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ error: 'Invalid user_id format.' });
      }
      filter.user_id = mongoose.Types.ObjectId.createFromHexString(user_id);
    }
    if (park_id) {
      if (!mongoose.Types.ObjectId.isValid(park_id)) {
        return res.status(400).json({ error: 'Invalid park_id format.' });
      }
      filter.park_id = mongoose.Types.ObjectId.createFromHexString(user_id);
    }
  
    try {
      const reports = await Report.find(filter);

      if(!reports){
        res.status(404).json({ message: 'Report not found'});
      }
  
      res.status(200).json(reports);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

reports.post('/', tokenChecker, async (req, res) => {
  const { user_id, park_id, status, description } = req.body;

  if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(401).json({ error: 'Invalid or missing user_id format.' });
  }

  if (!park_id || !mongoose.Types.ObjectId.isValid(park_id)) {
    return res.status(402).json({ error: 'Invalid or missing park_id format.' });
  }

  if (!status || typeof status !== 'boolean') {
    return res.status(403).json({ error: 'Invalid status: must be a boolean.' });
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(404).json({ error: 'Invalid or missing description: must be a non-empty string.' });
  }

  try {
    
    const newReport = new Report({
      user_id: mongoose.Types.ObjectId.createFromHexString(user_id),
      park_id: mongoose.Types.ObjectId.createFromHexString(park_id),
      status: status,
      description: description.trim(),
    });

    await newReport.save();

    res.status(201).json({
      message: 'Report successfully created',
      report: newReport,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

reports.get('/:id', async (req, res) => {
    const reportID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reportID)) {
          return res.status(400).json({ error: 'Invalid ID format.' });
    }

    try{
        const report = Report.findById(mongoose.Types.ObjectId.createFromHexString(reportID));

        if(!report){
            res.status(404).json({ message: 'report not found'});
        }
        res.status.json(report);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

reports.delete('/:id', async (req, res) => {
    const reportID = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(reportID)){
        res.status(400).json({ error: 'Invalid ID format' });
    }

    try{
        const result = await Report.findByIdAndDelete(mongoose.Types.ObjectId.createFromHexString(reportID));
        
        if(!result){
            res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json({
            message: 'report successfully deleted',
            deletedReport: result 
        });
        
    } catch(err) {
        res.status(500).json({ error: err.message});
    }
});

module.exports = reports;