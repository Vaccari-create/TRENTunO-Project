

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Db, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

var app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json())
const port = 3030;
const Image = require("./models/Image");


const reviews = require('./Routes/reviews');
const parks = require('./Routes/parks');
const reports = require('./Routes/reports');
const events = require('./Routes/events');
const users = require('./Routes/users');
const pubPermission = require('./Routes/pubPermissions');
const images = require('./Routes/images');


app.use('/api/reviews', reviews);
app.use('/api/parks', parks);
app.use('/api/reports', reports);
app.use('/api/events', events);
app.use('/api/users', users);
app.use('/api/pubPermissions', pubPermission);
app.use('/api/images', images);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});



app.listen(port,()=>{console.log('Example app listening on port ' + port)})
mongoose.connect('mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/TRENTunO');
