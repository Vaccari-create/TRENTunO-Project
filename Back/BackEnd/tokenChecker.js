const express = require('express');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SUPER_SECRET;

const tokenChecker = function (req, res, next) {

    const token = req.headers['token'];
    
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