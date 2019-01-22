const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const EmployeeInput = require("../../validation/employee");

//Load models
const Employee = require("../../models/Employee");
const Exception = require("../../models/Exception");
const OtherException = require("../../models/Individualcost");
const OneOffPayment = require("../../models/Oneoffpayment");
const Level = require('../../models/Level');
const Payslip = require('../../models/Payslip');

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

  Level.findOne({_id: req.body.level}).where('is_delete').equals(0)
  .then(levelDetail => {
    const levelName = levelDetail.name;
    
    const newEmployee = new Employee({
      tag,
      name: req.body.name,
      email: req.body.email,
      designation: req.body.designation,
      department: req.body.department,
      level: req.body.level,
      levelName
    });
  
    newEmployee
      .save()
      .then(employee => res.json(employee))
      .catch(err => res.status(400).json(err));
  })
  .catch(err => console.log(err));
});

//@route  Put api/employee/:id
//@desc Edit employee route
//@access Private
router.put("/:id", protect, (req, res) => {
  const { errors, isValid } = EmployeeInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Level.findOne({_id: req.body.level}).where('is_delete').equals(0)
  .then(levelDetail => {
    const levelName = levelDetail.name;

    employeeFields = {
      name: req.body.name,
      email: req.body.email,
      designation: req.body.designation,
      department: req.body.department,
      level: req.body.level,
      levelName
    };
  
    Employee.findOne({ _id: req.params.id }).where('is_delete').equals(0)
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
  })
  .catch(err => console.log(err))
});

//@route  Get api/employee
//@desc View all employee route
//@access Private
router.get("/", protect, (req, res) => {
  const errors = {};

  Employee.find().where('is_delete').equals(0)
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
  Employee.findOne({ _id: req.params.id }).where('is_delete').equals(0)
    .then(employee => {
      if (!employee) {
        errors.noemployee = "There is no employee with this record";
        return res.status(404).json(errors);
      }
      res.json(employee);
    })
    .catch(err => console.log(err));
});


//@route  Post api/employee/:id
//@desc Move single employee to trash route
//@access Private
router.post('/:id', protect, (req, res) => {
  let employeeId = req.params.id;

  const deleteField = {
    is_delete: 1
  };

  Employee.findOne({ _id: req.params.id }).where('is_delete').equals(0)
  .then(employeeItem => {
    //Update
    Employee.findOneAndUpdate(
      { _id: req.params.id },
      { $set: deleteField },
      { new: true }
    )
    .then(() => {
      Exception.findOne({employee: employeeId}).where('is_delete').equals(0)
      .then(() => {
        Exception.findOneAndUpdate(
          { employee: employeeId },
          { $set: deleteField },
          { new: true }
        )
        .then(() => {
          OtherException.findOne({employee: employeeId}).where('is_delete').equals(0)
          .then(otherExceptionItems => {

            if(otherExceptionItems){
              //Move employee otherexception payment to trash upon employee deletion
              otherExceptionItems.forEach(item => {
                OtherException.findByIdAndUpdate(
                  { _id: item._id },
                  { $set: deleteField },
                  { new: true }
                )
                .then(() => {})
                .catch(err => console.log(err))
              })
            }

            OneOffPayment.findOne({employee: employeeId}).where('is_delete').equals(0)
            .then(oneOffPaymentItems => {

              if(oneOffPaymentItems){
                //Move employee one-off payment to trash upon employee deletion
                oneOffPaymentItems.forEach(item => {
                  OneOffPayment.findByIdAndUpdate(
                    { _id: item._id },
                    { $set: deleteField },
                    { new: true }
                  )
                  .then(() => {})
                  .catch(err => console.log(err))
                })
              }

              //Move employee slip to trash upon employee deletion
              let date = new Date();
              const presentMonth = date.toLocaleString("en-us", { month: "long" });
              Payslip.find({employee: employeeId}, {is_delete: 0}).where('presentMonth').equals(presentMonth)
              .then(employeePayslip => {
                employeePayslip.forEach(employeePayslipItem => {
                  Payslip.findOneAndUpdate(
                    { _id: employeePayslipItem._id },
                    { $set: deleteField },
                    { new: true }
                  )
                  .then(() => {})
                  .catch(err => console.log(err))
                })
              })
              .catch(err => console.log(err))

              res.json({success: 'true'})

            })
            .catch(err => console.log(err))

          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    .catch(err => console.log(err))
  });

})


//@route  Delete api/employee/:id
//@desc Delete employee route
//@access Private
router.delete("/:id", protect, (req, res) => {
  let employeeId = req.params.id;
  Employee.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      Exception.findOneAndDelete({ employee: employeeId })
        .then(() => {
          OtherException.find({ employee: employeeId })
            .then(exceptiondetails => {
              exceptiondetails.forEach(exceptiondetail => {
                exceptiondetail
                  .remove()
                  .then(() => {})
                  .catch(err => console.log(err));
              });

              OneOffPayment.find({ employee: employeeId })
                .then(oneOff => {
                  oneOff.forEach(oneOffItem => {
                    oneOffItem
                      .remove()
                      .then(() => {})
                      .catch(err => console.log(err));
                  });
                })
                .catch(err => console.log(err));

              res.json({ success: true });
            })
            .catch(err => res.json(err));
        })
        .catch(err => res.json(err));
    })
    .catch(err =>
      res.status(404).json({ message: "Error fetching employee information" })
    );
});

module.exports = router;
