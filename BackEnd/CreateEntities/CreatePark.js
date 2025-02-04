const mongoose = require('mongoose');
const Park = require('../models/Park');

const DB = process.env.DB;

// Function to create a new park
async function createAlberePark() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/TRENTunO');
    console.log('Connected to MongoDB');

    // Define the park object based on the updated schema
    const park = new Park({
      name: "Albere Park",
      x_coord: 46.0709, // Example latitude for Trento
      y_coord: 11.1212, // Example longitude for Trento
      categories: [2, 5], // Example categories (adjust to your needs)
      rating: 4.8, // Example rating
      description: "A beautiful park in Trento with a relaxing atmosphere, ideal for outdoor activities.",
      services: ["Sport", "Fountain"] // Services available in the park
    });

    // Save the park to the database
    await park.save();
    console.log('Albere Park created successfully:', park);

  } catch (err) {
    console.error('Failed to create Albere Park:', err);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Call the function
//createAlberePark();

async function createPiazzaVeneziaPark() {
    try {
      // Connect to the MongoDB database
      await mongoose.connect('mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/TRENTunO');
      console.log('Connected to MongoDB');
  
      // Define the park object for Piazza Venezia
      const park = new Park({
        name: "Piazza Venezia",
        x_coord: 46.0672, // Latitude for Piazza Venezia, Trento
        y_coord: 11.1217, // Longitude for Piazza Venezia, Trento
        categories: [1, 4, 5], // Example categories: adjust as needed
        rating: 4.5, // Example rating
        description: "A central and vibrant square in Trento, perfect for social gatherings and events.",
        services: ["Fountain", "Sport", "Running"] // Services available in Piazza Venezia
      });
  
      // Save the park to the database
      await park.save();
      console.log('Piazza Venezia created successfully:', park);
  
    } catch (err) {
      console.error('Failed to create Piazza Venezia:', err);
    } finally {
      // Disconnect from the database
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }
  
  // Call the function
  createPiazzaVeneziaPark();
  
