var mongoose = require('mongoose');
var Enums = require('../models/Enums');
var Schema = mongoose.Schema;
module.exports = mongoose.model('User', new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true}, 
	email: {type: String, required: true},
    password: {type: String, required: true},
    user_level: {type: String, required: true},
    auth: {type: String, default: false},
    
}));