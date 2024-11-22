var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.export = mongoose.model('User', new Schema({
    name: String,
    surname: String, 
    email: String, 
    password: String,
    auth: Boolean,
    __v: Number
}))