const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

//Validation rules
const levelInput = require("../../validation/level");
const bonusInput = require("../../validation/bonus");
const deductableInput = require("../../validation/deductable");

//Load Level model
const Level = require("../../models/Level");
const Employee = require("../../models/Employee");

//@route  Get api/level/:id
//@desc View single level route
//@access Private
router.get("/single/:id", protect, (req, res) => {
  const errors = {};
  Level.findOne({ _id: req.params.id }).where('is_delete').equals(0)
    .then(level => {
      if (!level) {
        errors.nolevel = "There is no grade level with this record";
        return res.status(404).json(errors);
      }
      res.json(level);
    })
    .catch(err =>
      res.status(404).json({ message: "Grade level record not found" })
    );
});

//@route  Get api/level/all
//@desc View Employee level route
//@access Private
router.get("/all", protect, (req, res) => {
  const errors = {};

  Level.find().where('is_delete').equals(0)
    .then(levels => {
      if (!levels) {
        errors.nolevel = "There are no levels";
        return res.status(404).json(errors);
      }
      res.json(levels);
    })
    .catch(err => res.status(400).json({ message: "Error fetching levels" }));
});

//@route  Post api/level
//@desc Create or Edit Employee level route
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

  Level.findOne({ _id: req.body.id }).where('is_delete').equals(0)
  .then(level => {
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

//@route  Post api/level
//@desc Move Employee level to trash route
//@access Private
router.post("/:id", protect, (req, res) => {

  const levelFields = {
    is_delete: 1
  };

  levelFields._id = req.params.id;

  Employee.findOne({ level: req.params.id })
    .where("is_delete")
    .equals(0)
    .then(employee => {
      if (!employee) {
        Level.findOne({ _id: req.params.id }).then(level => {
          //Update
          Level.findOneAndUpdate(
            { _id: req.params.id },
            { $set: levelFields },
            { new: true }
          )
            .then(() => {
              res.json({ success: true });
            })
            .catch(err =>
              res
                .status(404)
                .json({ message: "Error getting level information" })
            );
        });
      } else {
        res.status(400).json({
          message: "Cannot delete level that is attached to an employee!"
        });
      }
    });
});

//@route  Post api/level/bonus/:id
//@desc Create Employee bonus route
//@access Private
router.post("/bonus/:id", protect, (req, res) => {
  const { errors, isValid } = bonusInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Level.findOne({ _id: req.body.level }).where('is_delete').equals(0)
    .then(level => {
      const newBonus = {
        name: req.body.name,
        amount: req.body.amount
      };
      level.bonuses.unshift(newBonus);
      level
        .save()
        .then(level => {
          Level.find().where('is_delete').equals(0)
            .then(levels => res.json(levels))
            .catch(err => console.log(err));
        })
        .catch(err =>
          res.status(400).json({ message: "Error saving bonus information" })
        );
    })
    .catch(err => res.status(404).json({ message: "Error fetching level" }));
});

//@route  Post api/level/deductables/:id
//@desc Create Employee deductable route
//@access Private
router.post("/deductable/:id", protect, (req, res) => {
  const { errors, isValid } = deductableInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Level.findOne({ _id: req.params.id }).where('is_delete').equals(0)
  .then(level => {

    const newDeductable = {
      name: req.body.name,
      amount: req.body.amount
    };

    level.deductables.unshift(newDeductable);
    level
      .save()
      .then(level => {
        Level.find().where('is_delete').equals(0)
          .then(levels => res.json(levels))
          .catch(err => console.log(err));
      })
      .catch(err =>
        res.status(400).json({ message: "Error saving deductable information" })
      );
  })
  .catch(err => console.log(err))
});

//@route  Delete api/level/:id
//@desc Delete Employee level route
//@access Private
router.delete("/:id", protect, (req, res) => {
  Employee.findOne({ level: req.params.id })
    .then(employee => {
      if (!employee) {
        Level.findOneAndDelete({ _id: req.params.id })
          .then(() => {
            res.json({ success: true });
          })
          .catch(err =>
            res.status(404).json({ message: "Error getting level information" })
          );
      } else {
        res.status(400).json({
          message: "Cannot delete level that is attached to an employee!"
        });
      }
    })
    .catch(err => console.log(err));
});

//@route  Delete api/level/bonus/:id/:bid
//@desc Delete Employee bonus route
//@access Private
router.delete("/bonus/:id/:bid", protect, (req, res) => {
  Level.findOne({ _id: req.params.id }).where('is_delete').equals(0)
    .then(level => {
      //Check if Bonus exist
      if (
        level.bonuses.filter(
          bonuses => bonuses._id.toString() === req.params.bid
        ).length === 0
      ) {
        return res.status(404).json({ bonusnotexist: "Bonus does not exist" });
      }
      // Get remove index
      const removeIndex = level.bonuses
        .map(item => item._id.toString())
        .indexOf(req.params.bid);

      // Splice deductable out of array
      level.bonuses.splice(removeIndex, 1);

      level.save().then(level => {
        Level.find().where('is_delete').equals(0)
          .then(levels => res.json(levels))
          .catch(err => console.log(err));
      });
    })
    .catch(err => res.status(404).json(err));
});

//@route  Delete api/level/deductable/:id/:did
//@desc Delete Employee deductable route
//@access Private
router.delete("/deductable/:id/:did", protect, (req, res) => {
  Level.findOne({ _id: req.params.id }).where('is_delete').equals(0)
    .then(level => {
      //Check if Deductable exist
      if (
        level.deductables.filter(
          deductables => deductables._id.toString() === req.params.did
        ).length === 0
      ) {
        return res
          .status(404)
          .json({ deductablesnotexist: "Deductables does not exist" });
      }
      // Get remove index
      const removeIndex = level.deductables
        .map(item => item._id.toString())
        .indexOf(req.params.did);

      // Splice deductable out of array
      level.deductables.splice(removeIndex, 1);

      level.save().then(level => {
        Level.find().where('is_delete').equals(0)
          .then(levels => res.json(levels))
          .catch(err => console.log(err));
      });
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
