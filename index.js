const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;
const DB = process.env.DB;

app.use( (req, res, next) => {
    console.log( req.method, req.url );
    next();
} );


app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.get('/a', (req, res) => {
    res.send('Hello World!');
});
app.get('/b', (req, res) => {
    res.send('Hello Mars!');
});

mongoose.connect("mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/TRENTunO").then( () => {

    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    } );

} ).catch( (err) => {
    console.log('Failed to connect to MongoDB', err);
} );