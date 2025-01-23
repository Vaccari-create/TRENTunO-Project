const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb');
const Report = require('../models/Report');

const reports = express.Router();

reports.get('/', async (req, res) => {
    const { user_id, park_id } = req.query;
  
    const filter = {};
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
      const reports = await Report.find(filter);
  
      res.status(200).json(reports);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

reports.post('/', async (req, res) => {
  const { user_id, park_id, status, description } = req.body;

  if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(400).json({ error: 'Invalid or missing user_id format.' });
  }

  if (!park_id || !mongoose.Types.ObjectId.isValid(park_id)) {
    return res.status(400).json({ error: 'Invalid or missing park_id format.' });
  }

  if (typeof status !== 'boolean') {
    return res.status(400).json({ error: 'Invalid status: must be a boolean.' });
  }

  if (typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing description: must be a non-empty string.' });
  }

  try {
    
    const newReport = new Report({
      user_id: user_id,
      park_id: park_id,
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

/*

NON HA SENSO FARE LA DELETE DI TUTTO 

reports.delete('/', async (req, res) => {
  //delete by name?

  try{
    const result = await Report.deleteMany({});

    res.status(200).json({
      message: "All parks have been successful delete", 
      deletedCount: result.deletedCount,                // Number of reports deleted
    });
  } catch(err){
    res.status(500).json({ error: err.message});
  }
});
*/

reports.get('/:id', async (req, res) => {
    const reportID = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(reportID)) {
          return res.status(400).json({ error: 'Invalid ID format.' });
    }

    try{
        
        const report = Report.findById(reportID);

        if(!report){
            res.status(404).json({ message: 'report not found'})
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

        const result = await Report.findByIdAndDelete(reportID);
        
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