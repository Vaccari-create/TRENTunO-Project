var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('PubRequest',new Schema({
    user_id: Number,
    Description: String
    //image ?
}))