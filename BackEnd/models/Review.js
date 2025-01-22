var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Review',new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // References 'User' collection
    parkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Park', required: true }, // References 'Park' collection
    Rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
    Description: { type: String, default: '' } // Optional field
}))

