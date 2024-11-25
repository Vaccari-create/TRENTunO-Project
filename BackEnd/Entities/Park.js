var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports = mongoose.model('Park',new Schema({
    id: Number,
    name: String,
    x_coord: Number, //coordinate x e y per geolocalizzarlo
    y_coord: Number,
    categories: [Number], //categorie di persone a cui è adatto
    rating: Number, //media delle recensioni (se presenti)
    description: String,  //descrizione del posto
    services: [Number]  //ogni servizio presente nel parco avrà un codice identificativo
}))