var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Image',new Schema({
    name: String,
    user: Number,
    URL: String
}));