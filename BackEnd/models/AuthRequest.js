var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('PubRequest',new Schema({
    user_id: {type: Number, required: true},
    Description: {type: String, required: true},
    //image ?
}))