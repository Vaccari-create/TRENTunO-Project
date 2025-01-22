var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('PubRequest',new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    park_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Park', required: true },
    x_coord: {type: Number, required: true},
    y_coord: {type: Number, required: true},
    Description: {type: String, required: true}, //required is true because it is strongly necessary that 
                                                //the person requesting to create an event in that park
                                                //specify what is its intent with it.
    //image ?
}))