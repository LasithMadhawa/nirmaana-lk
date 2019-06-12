const express = require('express');

const Artwork = require('../models/artwork');

const router = express.Router();

router.post('', (req, res, next) => {
  const artwork = new Artwork({
    title: req.body.title,
    preview: req.body.preview
  })
  artwork.save().then(addedArtwork => {
    res.status(201).json({
      message: "Artwork added successfully!",
      artworkId: addedArtwork._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const artwork = new Artwork({
    _id: req.body.id,
    title: req.body.title,
    preview: req.body.preview
  })
  Artwork.updateOne({_id: req.params.id}, artwork).then(result => {
    console.log(result);
    res.status(200).json({message: "Updated Successfully"})
  })
})

router.get('', (req,res, next) => {
  Artwork.find().then(documents => {
    res.status(200).json({
      message: 'Artworks fetched successfully',
      artworks: documents
  });
  })
});

router.get('/:id', (req, res, next) => {
  Artwork.findById(req.params.id).then(artwork => {
    if(artwork) {
      res.status(200).json(artwork);
    } else {
      res.status(404).json({message: "Artwork not found"})
    }
  })
})

router.delete('/:id', (req, res, next) => {
  Artwork.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post Deleted!"});
  });
});

module.exports = router;
