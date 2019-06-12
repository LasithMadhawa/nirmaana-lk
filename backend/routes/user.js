const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.signUpPassword, 10)
  .then(hash => {
    const user = new User({
      email: req.body.signUpEmail,
      password: hash
    });
    user.save()
      .then(result => {
        res.status(201).json({
          message: 'User Created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

});

module.exports = router;
