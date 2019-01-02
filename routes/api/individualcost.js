const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

//Validation rules
const individualcostInput = require("../../validation/individualcost");

//load Individualcost model
const Individualcost = require("../../models/Individualcost");

//@route  Post api/individualcost
//@desc Create/Edit Employee individual exception route
//@access Private
router.post("/", protect, (req, res) => {
  const { errors, isValid } = individualcostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const individualcostFields = {};

  individualcostFields._id = req.body.id;

  if (req.body.name) individualcostFields.name = req.body.name;
  if (req.body.amount) individualcostFields.amount = req.body.amount;
  if (req.body.costType) individualcostFields.costType = req.body.costType;
  if (req.body.employee) individualcostFields.employee = req.body.employee;

  Individualcost.findOne({ _id: req.body.id })
    .then(individualCost => {
      if (individualCost) {
        //Update
        Individualcost.findOneAndUpdate(
          { _id: req.body.id },
          { $set: individualcostFields },
          { new: true }
        )
          .then(updatedIndividualCost => res.json(updatedIndividualCost))
          .catch(err =>
            res.status(400).json({ message: "Error updating this information" })
          );
      } else {
        //Create
        new Individualcost(individualcostFields)
          .save()
          .then(newIndividualCost => res.json(newIndividualCost))
          .catch(err =>
            res
              .status(400)
              .json({ message: "Error saving new employee exception" })
          );
      }
    })
    .catch(err => console.log(err));
});

//@route  Get api/individualcost
//@desc View Employee individual exception route
//@access Private
router.get("/", protect, (req, res) => {
  const errors = {};
  Individualcost.find()
    .then(individualCost => {
      if (!individualCost) {
        errors.individualCost = "There are no levels";
        return res.status(404).json(errors);
      }
      res.json(individualCost);
    })
    .catch(err => console.log(err));
});

//@route  Delete api/individualcost
//@desc Delete Employee individual exception route
//@access Private
router.delete("/", protect, (req, res) => {
  Individualcost.findOneAndRemove({ _id: req.body.id })
    .then(() => res.json({ success: true }))
    .catch(err => console.log(err));
});

module.exports = router;
