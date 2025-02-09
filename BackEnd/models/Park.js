var mongoose = require('mongoose');
var Enums = require('./Enums');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Park',new mongoose.Schema({
    name: {type: String, required: true},
    x_coord: {type: Number, required: true}, //coordinate x e y per geolocalizzarlo
    y_coord: {type: Number, required: true}, 
    rating: {type: Number, default: 0}, //media delle recensioni (se presenti)
    description: {type: String, required: true},  //descrizione del posto
    categories: {type: [String], enum: Enums.categories.enum, default: [] }  //ogni servizio presente nel parco avrà un codice identificativo
}))