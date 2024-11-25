var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Comment',new Schema({
    user_id: Number,
    park_id: Number,
    Rating: Number,
    Description: String
}))