const mongoose = require('mongoose');
const Park = require('../Entities/Park');

const DB = process.env.DB;

mongoose.connect('mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/TRENTunO').then( async () => {
    
    console.log('Connected to MongoDB');
    
    const park = await new Park()
    park.id = 2;
    park.name = "Parco della sconfitta";
    park.x_coord = 2;
    park.y_coord = 3;
    park.categories = [1,7];
    park.rating = 1.2;
    park.description = "Lorem impus est idux";
    park.services = [4,9];
    await park.save();

    console.log('User created');
    
} ).catch( (err) => {
    console.log('Failed to connect to MongoDB', err);
} );