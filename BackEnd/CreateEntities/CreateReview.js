const mongoose = require('mongoose');
const Review = require('../models/Review');

const DB = process.env.DB;

mongoose.connect('mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/TRENTunO').then( async () => {
    
    console.log('Connected to MongoDB');
    
    const review = await new Review();
    
    review.user_id = 1;
    review.park_id = 2;
    review.Rating = 5;
    review.Description = "Very beautiful park!";

    await review.save();

    console.log('Review created');
    
} ).catch( (err) => {
    console.log('Failed to connect to MongoDB', err);
} );