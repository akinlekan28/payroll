const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });
const fs = require('fs');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');

const EmployeeInput = require("../../validation/employee");
global.__basedir = __dirname;

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
      stateResidence: req.body.stateResidence,
      bankName: req.body.bankName,
      accountNumber: req.body.accountNumber,
      pfaName: req.body.pfaName,
      pensionAccountNumber: req.body.pensionAccountNumber,
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
      stateResidence: req.body.stateResidence,
      bankName: req.body.bankName,
      accountNumber: req.body.accountNumber,
      pfaName: req.body.pfaName,
      pensionAccountNumber: req.body.pensionAccountNumber,
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


//multer upload storage
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, __basedir + '/docs/')
  },
  filename: (req, res, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }
})

const upload = multer({storage: storage});

//@route Post api/employee/upload
//@desc Upload employee route
//@access Private
router.post("/upload", protect, upload.single("uploadfile"), (req, res) => {
  importExcelData2MongoDB(__basedir + '/docs/' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
})

function importExcelData2MongoDB(filePath){
  // -> Read Excel File to Json Data
  const excelData = excelToJson({
      sourceFile: filePath,
      sheets:[{
          // Excel Sheet Name
          name: 'Customers',

          // Header Row -> be skipped and will not be present at our result object.
          header:{
             rows: 1
          },
    
          // Mapping columns to keys
          columnToKey: {
              A: 'tag',
              B: 'name',
              C: 'email',
              D: 'designation',
              E: 'department',
              F: 'stateResidence',
              G: 'bankName',
              H: 'accountNumber',
              I: 'pfaName',
              J: 'pensionAccountNumber',
              K: 'level'
          }
      }]
  });

  // -> Log Excel Data to Console
  console.log(excelData);

  /**
  { 
      Customers:
      [ 
          { _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
          { _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
          { _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
          { _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
          { _id: 5, name: 'Jason Bourne', address: 'California', age: 36 } 
      ] 
  }
  */	

  // Insert Json-Object to MongoDB
      Employee.insertMany(excelData.Customers, (err, res) => {
          if (err) throw err;
          console.log("Number of documents inserted: " + res.insertedCount);
      });
    
  fs.unlinkSync(filePath);
}

module.exports = router;
