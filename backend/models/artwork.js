const mongoose = require('mongoose');

const artworkSchema = mongoose.Schema({
  title: {type: String, required: true},
  preview: {type: String, required: true}
});

module.exports = mongoose.model('Artwork', artworkSchema);
