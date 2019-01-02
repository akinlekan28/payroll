const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const EmployeeInput = require("../../validation/employee");

//Load Employee model
const Employee = require("../../models/Employee");

//Load Salary exception model
const Exception = require("../../models/Exception");

//@route  Post api/employee
//@desc Create employee route
//@access Private
router.post("/", protect, (req, res) => {
  const { errors, isValid } = EmployeeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let fTag =
    Math.random()
      .toString(9)
      .substring(2, 7) +
    Math.random()
      .toString(36)
      .substring(2, 4);
  let tag = "EMP" + fTag;

  const newEmployee = new Employee({
    tag,
    name: req.body.name,
    email: req.body.email,
    designation: req.body.designation,
    department: req.body.department,
    level: req.body.level
  });

  newEmployee
    .save()
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json(err));
});

//@route  Put api/employee/:id
//@desc Edit employee route
//@access Private
router.put("/:id", protect, (req, res) => {
  const { errors, isValid } = EmployeeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  employeeFields = {
    name: req.body.name,
    email: req.body.email,
    designation: req.body.designation,
    department: req.body.department,
    level: req.body.level
  };

  Employee.findOne({ _id: req.params.id })
    .then(employee => {
      if (employee) {
        Employee.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: employeeFields },
          { new: true }
        )
          .then(employee => res.json(employee))
          .catch(err =>
            res
              .status(400)
              .json({ message: "Error saving employee information" })
          );
      }
    })
    .catch(err =>
      res.status(400).json({ message: "Error getting employee information" })
    );
});

//@route  Get api/employee
//@desc View all employee route
//@access Private
router.get("/", protect, (req, res) => {
  const errors = {};

  Employee.find()
    .then(employee => {
      if (!employee) {
        errors.noemployee = "There are no employees";
        return res.status(404).json(errors);
      }
      res.json(employee);
    })
    .catch(err =>
      res.status(400).json({ message: "Error fetching employees" })
    );
});

//@route  Get api/employee/:id
//@desc View single employee route
//@access Private
router.get("/single/:id", protect, (req, res) => {
  const errors = {};
  Employee.findOne({ _id: req.params.id })
    .then(employee => {
      if (!employee) {
        errors.noemployee = "There is no employee with this record";
        return res.status(404).json(errors);
      }
      res.json(employee);
    })
    .catch(err => console.log(err));
});

//@route  Delete api/employee/:id
//@desc Delete employee route
//@access Private
router.delete("/:id", protect, (req, res) => {
  let employeeId = req.params.id;
  Employee.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      Exception.findOneAndRemove({ employee: employeeId })
        .then(() => res.json({ Success: true }))
        .catch(err => res.json(err));
    })
    .catch(err =>
      res.status(404).json({ message: "Error fetching employee information" })
    );
});

module.exports = router;
