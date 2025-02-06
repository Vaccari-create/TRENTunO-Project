const User = require("../models/User");
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require ('mongoose');
const tokenChecker = require('../tokenChecker');

const users = express.Router();


users.post("/authentication", async (req, res) => {
  const { email, password } = req.body;

  try {
      
      const user = await User.findOne({ email, password }).exec();
      if (!user) {
          return res.status(401).json({ success: false, message: "Authentication failed" });
      }

      const token = jwt.sign(
          { userId: user._id, email: user.email, auth: user.auth },
          process.env.SUPER_SECRET,
          { expiresIn: 86400 }
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
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "An error occurred while fetching the user." });
  }
});


users.delete("/:id", tokenChecker, async (req, res) => {
    const { id } = req.params;
    const { adminId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }

    const admin = await User.findById(adminId);
      if (!admin || admin.user_level !== "Admin") {
          return res.status(403).json({ message: "Only admins can change authorization status." });
      }
  
    try {
      const deletedUser = await User.findByIdAndDelete(id);
  
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

users.put("/:id", tokenChecker, async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body.updateFields;

        if (!updateFields || Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No fields to update provided" });
        }
        
        const updated = await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

        if (!updated) {
          res.status(404).json({ message: "No user found with the provided ID" });
        } else {
          res.status(200).json({ message: "User updated successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

users.put("/changePassword/:id", tokenChecker,  async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
  }

  if (!password || password.trim() === "") {
      return res.status(400).json({ message: "New password is required." });
  }

  try {
      const user = await User.findById(id);
      if (!user) {
          return res.status(404).json({ message: "No user found with the provided ID." });
      }

      user.password = password;
      await user.save();

      res.status(200).json({ message: "Password successfully updated." });
  } catch (err) {
      console.error("Error updating password:", err);
      res.status(500).json({ message: "Server error." });
  }
});


users.put("/changeAuth/:id", tokenChecker, async (req, res) => {

  //This API is related to the PubPermission request. Once the Admin conceives the authorization
  //to the user to publish events, the "auth" field of the user is put to true.

  const { id } = req.params;
  const { adminId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ message: "Invalid user ID or admin ID format." });
  }

  try {
      
      const admin = await User.findById(adminId);
      if (!admin || admin.user_level !== "Admin") {
          return res.status(403).json({ message: "Only admins can change authorization status." });
      }

      const user = await User.findByIdAndUpdate(id, { auth: true }, { new: true });

      if (!user) {
          return res.status(404).json({ message: "No user found with the provided ID." });
      }

      res.status(200).json({
          message: "User authorization status successfully updated.",
          user,
      });
  } catch (err) {
      console.error("Error updating authorization status:", err);
      res.status(500).json({ message: "Server error." });
  }
});


module.exports = users;
