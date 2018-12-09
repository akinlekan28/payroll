const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const levelInput = require("../../validation/level");

//Load Level model
const Level = require("../../models/Level");

//@route  Post api/level
//@desc Create or Edit User profile route
//@access Private
router.post("/", protect, (req, res) => {
  const { errors, isValid } = levelInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const levelFields = {};

  levelFields._id = req.body.id;

  if (req.body.name) levelFields.name = req.body.name;
  if (req.body.description) levelFields.description = req.body.description;
  if (req.body.basic) levelFields.basic = req.body.basic;

  Level.findOne({ _id: req.body.id }).then(level => {
    if (level) {
      //Update
      Level.findOneAndUpdate(
        { _id: req.body.id },
        { $set: levelFields },
        { new: true }
      )
        .then(level => res.json(level))
        .catch(err => console.log(err));
    } else {
      //Create
      new Level(levelFields)
        .save()
        .then(level => res.json(level))
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
