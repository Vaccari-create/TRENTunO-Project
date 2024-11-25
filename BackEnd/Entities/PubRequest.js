var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('PubRequest',new Schema({
    user_id: Number,
    park_id: Number,
    x_coord: Number,
    y_coord: Number,
    Description: String
    //image ?
}))