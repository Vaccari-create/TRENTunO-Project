const express = require('express');
const mongoose = require('mongoose');
const Report = require('../models/Report');
const tokenChecker = require('../tokenChecker');
const Enums = require('../models/Enums');

const reports = express.Router();

reports.get("/", async (req, res) => {
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
  const { user_id, park_id, description } = req.body;

  if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
    return res.status(401).json({ error: 'Invalid or missing user_id format.' });
  }

  if (!park_id || !mongoose.Types.ObjectId.isValid(park_id)) {
    return res.status(402).json({ error: 'Invalid or missing park_id format.' });
  }


  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(404).json({ error: 'Invalid or missing description: must be a non-empty string.' });
  }

  try {
    
    const newReport = new Report({
      user_id,
      park_id,
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

reports.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid user ID format." });
    }

    try{
        const report = await Report.findById(id);

        if(!report){
            res.status(404).json({ message: 'report not found'});
        }
        res.status(200).json(report);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

reports.delete("/:id",tokenChecker, async (req, res) => {
    const { id } = req.params;
    const { user_level } = req.query;

    if (!user_level || user_level !== 'Admin') {
      return res.status(403).json({ message: 'Only admins can get publication permissions.' });
    }
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({ error: 'Invalid ID format' });
    }

    try{
        const result = await Report.findByIdAndDelete(id);
        
        if(!result){
            res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json({
            message: 'report successfully deleted',
            deletedReport: result 
        });
        
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
});


reports.put("/changeStatus/:id", tokenChecker, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { user_level } = req.query;

  if (!user_level || user_level !== 'Admin') {
    return res.status(403).json({ message: 'Only admins can get publication permissions.' });
  }
  const validStatuses = Enums.status_level.enum;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid report ID format." });
  }
  
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ 
      error: `Invalid status. Allowed values: ${validStatuses.join(", ")}.` 
    });
  }

  try {
    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found." });
    }

    res.status(200).json({
      message: "Report status successfully updated.",
      report: updatedReport,
    });
  } catch (err) {
    console.error("Error updating report status:", err);
    res.status(500).json({ error: "An error occurred while updating the report status." });
  }
});

module.exports = reports;