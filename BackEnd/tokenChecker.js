const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./Routes/users');

const SECRET = process.env.SECRET;

function tokenChecker (req, res, next) {
    const token = req.headers['x-access-token'];
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