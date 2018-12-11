const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

//Load models
const Level = require("../../models/Level");
const Employee = require("../../models/Employee");

router.get("/:id", protect, (req, res) => {
  Employee.findOne({ _id: req.params.id})
    .then(employee => {
      Level.findOne({ _id: employee.level })
        .then(level => {
        let levelBonus = level.bonuses,
        levelDeductable = level.deductables,
        deductableSum = 0,
        bonusSum = 0;
        levelBonus.forEach(bonus => {
            bonusSum += bonus.amount;
        });
        levelDeductable.forEach(deductable => {
            deductableSum += deductable.amount;
        });

        const payable = (bonusSum+level.basic)-deductableSum;

        const taxReport = {
            payable,
            bonusSum,
            deductableSum,
            employee,
            level
        }
        return res.status(200).json(taxReport);        
        })
        .catch(err =>
          res.status.json({ message: "User grade level not found" })
        );
    })
    .catch(err => res.status(404).json({ message: "Error fetching user" }));
});

module.exports = router;
