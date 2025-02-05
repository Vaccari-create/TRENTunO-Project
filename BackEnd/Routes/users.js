const User = require("../models/User");
const jwt = require('jsonwebtoken');
const tokenChecker = require('../tokenChecker');
const express = require('express');
const mongoose = require ('mongoose');
const users = express();

users.post("/authentications", async (req, res) => {
  const { email, password } = req.body;

  try {
      // Check if user exists and the password matches
      const user = await User.findOne({ email, password }).exec();
      if (!user) {
          return res.status(401).json({ success: false, message: "Authentication failed" });
      }

      // Generate JWT token
      const token = jwt.sign(
          { userId: user._id, email: user.email, auth: user.auth },
          process.env.SUPER_SECRET,
          { expiresIn: 8640000 }
      );

      res.status(200).json({
          success: true,
          message: "Authentication success",
          token,
          userId: user._id,
          auth: user.auth,
      });
  } catch (err) {
      console.error("Error during authentication:", err);
      res.status(500).json({ error: "Internal server error" });
  }
});



users.get("/", async (req, res) => {
    const { user_level }  = req.query;
  
    if (user_level) {
      const validUserLevels = ["Admin", "Client"];
      if (!validUserLevels.includes(user_level)) {
        return res.status(400).json({ error: "Invalid user_level. Allowed values: Admin, Client." });
      }
    }
  
    try {
      const filter = user_level ? { user_level } : {};
  
      const usersList = await User.find(filter);
  
      if (usersList.length > 0) {
        return res.status(200).json(usersList);
      } else {
        return res.status(404).json({ message: "No users found." });
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "An error occurred while fetching users." });
    }
  });


  users.post("/", async (req,res) => {
    try{
        const ExistingUser = await User.find({email: req.body.email});
        if(ExistingUser.length > 0){
            return res.status(409).json({message: "There is an existing account!"});
        }
        else{
            console.log(req.body.name);
            const newUser = new User({
                name : req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: req.body.password,
                user_level: "Client",
                auth: false
            });
            await newUser.save();
            return res.status(201).json({
                message: "User created successfully",
                park: newUser,
    
            });
        }
    }    
    catch(err){
        return res.status(500).json({error: err.message});

    }
});

users.get("/:id", async (req, res) => {
  const userID  = req.params.id;
  // console.log(userID)

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    const user = await User.findById(mongoose.Types.ObjectId.createFromHexString(userID));

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "An error occurred while fetching the user." });
  }
});


users.delete("/:id", async (req, res) => {
    const userID = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }
  
    try {
      const deletedUser = await User.findByIdAndDelete(mongoose.Types.ObjectId.createFromHexString(userID));
  
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({
        message: "User successfully deleted.",
        user: deletedUser,
      });
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "An error occurred while deleting the user." });
    }
  });
const { ObjectId } = require('mongodb'); // Importa ObjectId

users.put("/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id);
        const updateFields = req.body.updateFields;

        if (!updateFields || Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No fields to update provided" });
        }

        const updated = await User.updateOne(
            { _id: id },
            { $set: updateFields }
        );

        if (updated.modifiedCount === 1) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "No user found with the provided ID" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

users.put("/changePassword/:id", async (req, res) => {});
users.put("/changeAuth/:id", async (req, res) => {});


module.exports = users;
