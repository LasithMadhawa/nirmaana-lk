const express = require ('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS");
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
//##########################################################################

app.post('/api/artworks', (req, res, next) => {
  const artwork = req.body;
  console.log(artwork);
  res.status(201).json({
    message: "Artwork added successfully!"
  });
})

app.get('/api/artworks', (req,res, next) => {
  const artworks = [
    {
      id: 'slkfjl',
      title: 'Cocacola',
      preview: 'slide1'
    },
    {
      id: 'lkdc',
      title: 'Design',
      preview: 'slide2'
    }
  ]
  res.status(200).json({
    message: 'Artworks fetched successfully',
    artworks: artworks
  })
});



module.exports = app;
