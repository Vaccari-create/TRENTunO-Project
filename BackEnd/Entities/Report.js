var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Report',new Schema({
    user_id: Number,
    park_id: Number,
    status: String,
    description: String

}))