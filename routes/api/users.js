const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require('../../config/keys');

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load user model
const User = require("../../models/User");

//@route  Get api/users/register
//@desc Register user route
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        errors.email = "Email Already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bycrypt.genSalt(10, (err, salt) => {
          bycrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

//@route  Post api/users/login
//@desc Login user route
//@access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //User match
          const payload = { id: user.id, name: user.name }; //Create JWT Payload

          //Sign token
          jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (e, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;