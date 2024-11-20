const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./model/User');
const jwt = require('jsonwebtoken');
const tokenChecker = require('./src/tokenChecker');

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET;
const DB = process.env.DB;

app.use( (req, res, next) => {
    console.log( req.method, req.url );
    next();
} );


app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.get('/', (req, res) => {
    res.send('Hello World!');
} );

app.post('/api/v1/authentications', async (req, res) => {
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

// app.use( tokenChecker );

app.get('/api/v1/users', tokenChecker, async (req, res) => {
    const user = await User.findOne({username: req.user.username}).exec();
    if (user)
        res.json({
            self: "api/v1/users/"+user._id,
            username: user.username
        });
    else
        res.json({ success: false, message: 'User not found' });
})

mongoose.connect(DB).then( () => {

    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    } );

} ).catch( (err) => {
    console.log('Failed to connect to MongoDB', err);
} );