const mongoose = require('mongoose');
const User = require('../models/User');

const DB = process.env.DB;

mongoose.connect('mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/TRENTunO').then( async () => {
    
    console.log('Connected to MongoDB');
    const user = await new User()
    user.name = "Joao Victor";
    user.surname = "Costa Vaccari";
    user.email = "JoaoVictor31@admin.com";
    user.password = "Admin31";
    user.auth = true;
    await user.save();

    console.log('User created');
    
} ).catch( (err) => {
    console.log('Failed to connect to MongoDB', err);
} );