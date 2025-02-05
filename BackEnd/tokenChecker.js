const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./Routes/users');

const SECRET = process.env.SUPER_SECRET;

function tokenChecker (req, res, next) {
    console.log("SONO DENTRO");
    const token = req.headers['token'];
    console.log(token);
    if (token) {
        jwt.verify(token, SECRET, async (err, payload) => {
            if (err) {
                res.json({ success: false, message: 'Failed to authenticate token' });
            } else {
                req.user = payload;
                next();
            }
        } );
    } else {
        res.json({ success: false, message: 'No token provided' });
    }
}

module.exports = tokenChecker