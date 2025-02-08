var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Enums = require('./Enums');
module.exports = mongoose.model('Report',new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    park_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Park', required: true },
    status: { type: String, enum: Enums.status_level.enum, default: "Inserita"},
    description: { type: String, default: ''}
}))