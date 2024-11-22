const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Park = require('./model/Park');
const User = require('./model/User');

const PORT = process.env.PORT || 3000;


//CLIENT RESTAPI

/*-----------------  GET  -------------------*/
app.get('/client/parks', async (req, res) => {
    const park = await Park.find().exec();
    if(park){
        res.send({park}); //it returns an array with the whole object, including all attributes.
                        // I do not know how to return only the names of the parks.
    }
    else{
        res.send("ERRORE");
    }        
});

app.get('/client/login', async (req, res) => {
    const park = await Park.find().exec();
    if(park){

    }
    else{

    }       
});


/*-----------------  POST  ------------------- */
app.post('/client/register', async (req, res) => {
    const {name, surname} = req.body;
    const user = await User.findOne({name, surname}).exec();
    if(park){
        
    }
    else{

    }  
});

/*-----------------  PUT  ------------------- */

/*-----------------  DELETE  ------------------- */

// Delete one single document
Park.findOneAndDelete({name: ''}, (err, result) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Successful delete: ', result);
    }
});

// Delete more documents having some parameters common
Park.deleteMany({ name: '' })
.then((deleteManyResult) => { 
    console.log('Successful delete:', deleteManyResult.deletedCount, 'documents'); 
    mongoose.connection.close(); // Chiudi la connessione dopo le operazioni di eliminazione 
}) 
.catch((err) => { 
    console.log('Errore:', err); 
    mongoose.connection.close(); // Chiudi la connessione in caso di errore 
});

// Delete all documents
Book.deleteMany({})
  .then((deleteManyResult) => { 
    console.log('Successful delete:', deleteManyResult.deletedCount, ' documents'); 
  }) 
  .catch((err) => { 
    console.log('Error: ', err); 
  });

mongoose.connect("mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/TRENTunO").then( () => {

    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
    } );

} ).catch( (err) => {
    console.log('Failed to connect to MongoDB', err);
} );