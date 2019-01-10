const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const Exception = require("../../models/Exception");
const Employee = require("../../models/Employee");

//@route  Get api/exception
//@desc View All Employee salary exception route
//@access Private
router.get("/", protect, (req, res) => {
  Exception.find({is_delete: 0})
    .then(exception => {
      if (!exception) {
        errors.noexception = "There are no exceptions";
        return res.status(404).json(errors);
      }
      res.json(exception);
    })
    .catch(err =>
      res.status(400).json({ message: "Error fetching exception" })
    );
});

//@route  Get api/exception/:id
//@desc View an Employee salary exception route
//@access Private
router.get("/:id", protect, (req, res) => {
  Exception.findOne({ employee: req.params.id })
    .then(exception => {
      if (!exception) {
        errors.noexception = "Exception not found";
        return res.status(404).json(errors);
      }
      res.json(exception);
    })
    .catch(err =>
      res.status(400).json({ message: "Error fetching exception" })
    );
});

//@route  Post api/exception
//@desc Create Employee salary exception route
//@access Private
router.post("/", protect, (req, res) => {
  const errors = {};

  if (!req.body.amount && !req.body.employee) {
    errors.amount = "Amount field cannot be empty";
    errors.employee = "Please select an employee";
    return res.status(400).json(errors);
  }

  if (!req.body.amount) {
    errors.amount = "Amount field cannot be empty";
    return res.status(400).json(errors);
  }

  if (!req.body.employee) {
    errors.employee = "Please select an employee";
    return res.status(400).json(errors);
  }

  Exception.findOne({ employee: req.body.employee }).where('is_delete').equals(0)
    .then(employee => {
      if (employee) {
        errors.exception = "Employee salary exception already exist!";
        return res.status(400).json(errors);
      }

      Employee.findOne({ _id: req.body.employee })
        .then(employeeDetails => {
          if (employeeDetails) {
            let name = employeeDetails.name;

            const newSalaryException = new Exception({
              amount: req.body.amount,
              employee: req.body.employee,
              name
            });

            newSalaryException
              .save()
              .then(exceptionSalary => res.json(exceptionSalary))
              .catch(err =>
                res
                  .status(400)
                  .json({ message: "Error saving salary exception" })
              );
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

//@route  Post api/exception/:id
//@desc Move Employee salary exception to trash route
//@access Private
router.post('/:id', protect, (req, res) => {

  const exceptionFields = {
    is_delete: 1
  };

  Exception.findOne({ _id: req.params.id }).where('is_delete').equals(0)
        .then(exceptionItem => {
            //Update
            Exception.findOneAndUpdate(
              { _id: req.params.id },
              { $set: exceptionFields },
              { new: true }
            )
            .then(() => res.json({ success: true }))
            .catch(err => console.log(err))
        })
        .catch(err => res.status(404).json({message: "Error fetching individual exception record"}))
})

//@route  Put api/exception/:id
//@desc Edit Employee salary exception route
//@access Private
router.put("/:id", protect, (req, res) => {
  const errors = {};

  if (req.body.amount == "") {
    errors.amount = "Amount field cannot be empty";
    return res.status(400).json(errors);
  }

  newSalaryException = {
    amount: req.body.amount
  };

  Exception.findOne({ _id: req.params.id })
    .then(exception => {
      if (exception) {
        Exception.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: newSalaryException },
          { new: true }
        )
          .then(exception => res.json(exception))
          .catch(err =>
            res
              .status(400)
              .json({ message: "Error saving salary exception information" })
          );
      }
    })
    .catch(err =>
      res
        .status(400)
        .json({ message: "Error getting salary exception information" })
    );
});

//@route  Delete api/exception/:id
//@desc Delete Employee salary exception route
//@access Private
router.delete("/:id", protect, (req, res) => {
  Exception.findOne({ _id: req.params.id })
    .then(employee => {
      employee
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err =>
          res
            .status(404)
            .json({ message: "Error removing employee exception information" })
        );
    })
    .catch(err =>
      res
        .status(404)
        .json({ message: "Error fetching employee exception information" })
    );
});

module.exports = router;
