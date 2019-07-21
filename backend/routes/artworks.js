const express = require("express");
const multer = require("multer");

const Artwork = require("../models/artwork");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const artwork = new Artwork({
      title: req.body.title,
      preview: req.body.preview,
      imagePath: url + "/images/" + req.file.filename
    });
    artwork.save().then(addedArtwork => {
      res.status(201).json({
        message: "Artwork added successfully!",
        artwork: {
          ...addedArtwork,
          id: addedArtwork._id
        }
      });
    });
  }
);

router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const artwork = new Artwork({
      _id: req.body.id,
      title: req.body.title,
      preview: req.body.preview,
      imagePath: imagePath
    });
    Artwork.updateOne({ _id: req.params.id }, artwork).then(result => {
      console.log(result);
      res.status(200).json({ message: "Updated Successfully" });
    });
  }
);

router.get("", (req, res, next) => {
  Artwork.find().then(documents => {
    res.status(200).json({
      message: "Artworks fetched successfully",
      artworks: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Artwork.findById(req.params.id).then(artwork => {
    if (artwork) {
      res.status(200).json(artwork);
    } else {
      res.status(404).json({ message: "Artwork not found" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Artwork.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post Deleted!" });
  });
});

module.exports = router;
