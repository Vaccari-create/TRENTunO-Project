var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Review',new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    park_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Park', required: true }, 
    Rating: { type: Number, required: true, min: 1, max: 5 }, // Rating tra 1 e 5
    Description: { type: String, default: '' }
}))

