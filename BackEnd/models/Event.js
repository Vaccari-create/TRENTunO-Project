var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Event',new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //user that created the event
    park_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Park', required: true },
    description: { type: String, default: ''}
}))