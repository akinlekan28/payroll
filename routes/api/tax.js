const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

//Load models
const Level = require("../../models/Level");
const Employee = require("../../models/Employee");
const Exception = require("../../models/Exception");

router.get("/:id", protect, (req, res) => {
  Employee.findOne({ _id: req.params.id })
    .then(employeeDetails => {
      Level.findOne({ _id: employeeDetails.level })
        .then(level => {
          let payable,
            levelBonus = level.bonuses,
            levelDeductable = level.deductables,
            deductableSum = 0,
            bonusSum = 0;
          levelBonus.forEach(bonus => {
            bonusSum += bonus.amount;
          });
          levelDeductable.forEach(deductable => {
            deductableSum += deductable.amount;
          });

          Exception.findOne({ employee: employeeDetails._id })
            .then(employeeException => {
              if (employeeException) {
                payable = bonusSum + employeeException.amount - deductableSum;
                const taxReport = {
                  payable,
                  bonusSum,
                  deductableSum,
                  employeeDetails,
                  level,
                  employeeException
                };
                return res.status(200).json(taxReport);
              } else {
                payable = bonusSum + level.basic - deductableSum;
                const taxReport = {
                  payable,
                  bonusSum,
                  deductableSum,
                  employeeDetails,
                  level
                };
                return res.status(200).json(taxReport);
              }
            })
            .catch(err => console.log(err));
        })
        .catch(err =>
          res.status(404).json({ message: "User grade level not found" })
        );
    })
    .catch(err => res.status(404).json({ message: "Error fetching user" }));
});

module.exports = router;
