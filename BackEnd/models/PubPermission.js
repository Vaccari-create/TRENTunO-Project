
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('PubPermission',new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
    Description: {type: String, required: true} 
    // Image --> document given by the User to verify authenticity
}))