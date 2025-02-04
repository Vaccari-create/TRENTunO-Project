var mongoose = require('mongoose');
var Enums = require('../models/Enums');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Park',new Schema({
    name: {type: String, required: true},
    x_coord: {type: Number, required: true}, //coordinate x e y per geolocalizzarlo
    y_coord: {type: Number, required: true}, 
    categories: {type: [Number], default: -1}, //categorie di persone a cui è adatto
    rating: {type: Number, default: 0}, //media delle recensioni (se presenti)
    description: {type: String, required: true},  //descrizione del posto
    services: {type: [String], enum: ["Pet", "Sport", "Running", "Fountain"], default: [] }  //ogni servizio presente nel parco avrà un codice identificativo
}))