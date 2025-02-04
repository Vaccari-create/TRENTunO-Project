const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Db, ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

var app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json())
const port = 8080;
const Image = require("./models/Image");


const reviews = require('./Routes/reviews');
const parks = require('./Routes/parks');
const reports = require('./Routes/reports');
const events = require('./Routes/events');
const users = require('./Routes/users');


app.use('/api/reviews', reviews);
app.use('/api/parks', parks);
app.use('/api/reports', reports);
app.use('/api/events', events);
app.use('/api/users', users);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Configurazione di multer per salvare le immagini
const uploadFolder = path.join(__dirname, "uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
// Creazione della directory se non esiste
const fs = require("fs");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}
// Endpoint per caricare un'immagine
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nessun file caricato" });
      }
  
      // Salva i metadati nel database
      const newImage = new Image({
        name: req.file.originalname,
        URL: req.file.path,
      });
      const savedImage = await newImage.save();
  
      res.status(200).json({
        message: "Immagine caricata con successo",
        id: savedImage._id,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
// Endpoint per ottenere il percorso di un'immagine
app.get("/image/:id", async (req, res) => {
    try {
      const image = await Image.findById(req.params.id);
      if (!image) {
        return res.status(404).json({ error: "Immagine non trovata" });
      }
      res.status(200).json({ nome: image.name, percorso: image.URL });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.listen(port,()=>{console.log('Example app listening on port ' + port)})
mongoose.connect('mongodb+srv://Admin:Admin31@cluster31.d2mdy.mongodb.net/TRENTunO');
