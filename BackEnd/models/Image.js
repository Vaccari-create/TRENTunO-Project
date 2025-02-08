var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Image',new mongoose.Schema({
    name: {type: String, required: true},
    user: {type: Number, required: true},
    URL: {type: String, required: true},
}));