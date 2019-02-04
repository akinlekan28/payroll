const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

//Load models
const Oneoffpayment = require("../../models/Oneoffpayment");
const Employee = require("../../models/Employee");

//validation rules
const oneoffpaymentInput = require("../../validation/oneoffpayment");

//@route  Post api/oneoffpayment
//@desc Create/Edit Employee oneoffpayment exception route
//@access Private
router.post("/", protect, (req, res) => {
  const { errors, isValid } = oneoffpaymentInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const oneoffPaymentFields = {};

  oneoffPaymentFields._id = req.body.id;

  if (req.body.name) oneoffPaymentFields.name = req.body.name;
  if (req.body.amount) oneoffPaymentFields.amount = req.body.amount;
  if (req.body.month) oneoffPaymentFields.month = req.body.month;
  if (req.body.costType) oneoffPaymentFields.costType = req.body.costType;
  if (req.body.employee) oneoffPaymentFields.employee = req.body.employee;
  oneoffPaymentFields.employeeName = "";

  Employee.findOne({ _id: req.body.employee })
    .then(employee => {
      oneoffPaymentFields.employeeName = employee.name;

      Oneoffpayment.findOne({ _id: req.body.id })
        .then(oneOffPaymentItem => {
          if (oneOffPaymentItem) {
            //Update
            Oneoffpayment.findOneAndUpdate(
              { _id: req.body.id },
              { $set: oneoffPaymentFields },
              { new: true }
            )
              .then(updatedoneOffPayment => res.json(updatedoneOffPayment))
              .catch(err =>
                res
                  .status(400)
                  .json({ message: "Error updating this information" })
              );
          } else {
            //Create
            new Oneoffpayment(oneoffPaymentFields)
              .save()
              .then(newOneOffPayment => res.json(newOneOffPayment))
              .catch(err =>
                res
                  .status(400)
                  .json({ message: "Error saving new employee exception" })
              );
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//@route  Get api/oneoffpayment
//@desc View Employee oneoffpayment exception route
//@access Private
router.get("/", protect, (req, res) => {
  const errors = {};
  Oneoffpayment.find({ is_delete: 0 })
    .then(oneOffPaymentItems => {
      if (!oneOffPaymentItems) {
        errors.oneoffpayment = "There are no one off payment records";
        return res.status(404).json(errors);
      }
      res.json(oneOffPaymentItems);
    })
    .catch(err => console.log(err));
});

//@route  Post api/oneoffpayment
//@desc Move Employee oneoffpayment exception to trash route
//@access Private
router.post("/:id", protect, (req, res) => {
  const oneoffPaymentFields = {
    is_delete: 1
  };

  Oneoffpayment.findOne({ _id: req.params.id })
    .then(oneOffPaymentItem => {
      //Update
      Oneoffpayment.findOneAndUpdate(
        { _id: req.params.id },
        { $set: oneoffPaymentFields },
        { new: true }
      )
        .then(() => res.json({ success: true }))
        .catch(err => console.log(err));
    })
    .catch(err =>
      res.status(404).json({ message: "Error fetching oneoff payment record" })
    );
});

//@route  Delete api/oneoffpayment
//@desc Delete Employee oneoffpayment exception route
//@access Private
router.delete("/:id", protect, (req, res) => {
  Oneoffpayment.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch(err => console.log(err));
});

module.exports = router;
