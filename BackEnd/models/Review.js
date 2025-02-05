var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Review',new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: 'true' }, // References 'User' collection
    park_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Park', required: 'true' }, // References 'Park' collection
    Rating: { type: Number, required: 'true', min: 1, max: 5 }, // Rating between 1 and 5
    Description: { type: String, default: '' } // Optional field
}))

