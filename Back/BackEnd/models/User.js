var mongoose = require('mongoose');
var Enums = require('./Enums');
var Schema = mongoose.Schema;
module.exports = mongoose.model('User', new mongoose.Schema({
    name: {type: String, required: 'true' },
    surname: {type: String, required: 'true'}, 
	email: {type: String, required: 'true'},
    password: {type: String, required: 'true'},
    user_level: {type: String, enum: Enums.user_level.enum, required: 'true'},
    auth: {type: Boolean, default: false},
}));