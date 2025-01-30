const User = require("../models/User");
const users = express();
const jwt = require('jsonwebtoken');
const tokenChecker = require('../tokenChecker');
const express = require('express');
const mongoose = require ('mongoose');

users.post('/authentications', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }).exec()
    if (user) {
        const token = jwt.sign({username: user.username}, SECRET);
        res.json({
            success: true,
            message: 'Authentication success',
            token: token
        });
    } else {
        res.json({ success: false, message: 'Authentication failed' });
    }
} );



users.get("/", async (req, res) => {
    const { user_level } = req.query;
  
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
                auth: req.body.auth
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
  const { userID } = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).json({ error: "Invalid user ID format." });
  }

  try {
    const user = await User.findById(userID);

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
    const { userID } = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ error: "Invalid user ID format." });
    }
  
    try {
      const deletedUser = await User.findByIdAndDelete(userID);
  
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
        // Estrai l'ID e i campi da aggiornare dal body della richiesta
        const id = new ObjectId(req.params.id);
        const updateFields = req.body.updateFields;

        // Controlla se i campi da aggiornare sono stati forniti
        if (!updateFields || Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No fields to update provided" });
        }

        // Esegui l'update
        const updated = await User.updateOne(
            { _id: id }, // Trova il documento tramite _id
            { $set: updateFields } // Aggiorna solo i campi specificati
        );

        if (updated.modifiedCount === 1) {
            res.status(200).json({ message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "No user found with the provided ID" });
        }
    } catch (error) {
        // Gestisci eventuali errori
        res.status(500).json({ error: error.message });
    }
});

users.put("/cambiaPassword/:id", async (req, res) => {});

module.exports = users;
