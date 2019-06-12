const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const artworksRoutes = require("./routes/artworks");

const app = express();

mongoose.connect('mongodb://localhost:27017/nirmaanalk', { useNewUrlParser: true})
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed!")
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
})

//This function added to prevent favicon request##########################
app.use(ignoreFavicon);

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}
//########################################################################

app.use('/api/artworks', artworksRoutes);

module.exports = app;
