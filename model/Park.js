var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Park', new Schema({
    name: String,
    x_coord: Number,
    y_coord: Number,
    rating: Number, 
    description: String,
    __v: Number
}));