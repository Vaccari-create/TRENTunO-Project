var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Report',new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: 'true' },
    park_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Park', required: 'true' },
    status: { type: String, enum: ["Inserita", "Presa in carico", "Chiusa"], default: ''},
    description: { type: String, default: ''}
}))