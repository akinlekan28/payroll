const express = require('express');
const router = express.Router();
const passport = require('passport');
const protect = passport.authenticate('jwt', { session: false });

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const directory = 'docs/';
const Employee = require('../../models/Employee');
const Level = require('../../models/Level');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
      cb(null, 'docs/');
    } else {
      cb(null, 'docs/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (
      ['xls', 'xlsx', 'NUMBERS'].indexOf(
        file.originalname.split('.')[
          file.originalname.split('.').length - 1
        ]
      ) === -1
    ) {
      return callback(new Error('Wrong extension type'));
    }
    callback(null, true);
  },
});

router.post('/', protect, upload.single('file'), (req, res) => {
  let recordPath = path.join(
    __basedir,
    '../../',
    'docs/' + req.file.filename
  );
  importToDb(recordPath);
  fs.unlinkSync(recordPath);
  res.json({
    msg: 'Employee record uploaded and successfully imported',
    file: req.file,
  });
});

router.get('/download', (req, res) => {
  let template = path.join(
    __basedir,
    '../../',
    'docs/Employee_Record_Template.xlsx'
  );
  res.download(template);
});

const importToDb = (filePath) => {
  console.log(filePath);
  const excelData = excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        name: 'Employees',
        header: {
          rows: 1,
        },
        columnToKey: {
          A: 'name',
          B: 'email',
          C: 'designation',
          D: 'department',
          E: 'stateResidence',
          F: 'bankName',
          G: 'accountNumber',
          H: 'pfaName',
          I: 'pensionAccountNumber',
          J: 'levelName',
        },
      },
    ],
  });

  excelData.Employees.forEach((employee) => {
    let name = employee.name;
    let email = employee.email;
    let designation = employee.designation;
    let department = employee.department;
    let stateResidence = employee.stateResidence;
    let bankName = employee.bankName;
    bankName = bankName.toUpperCase();
    let accountNumber = employee.accountNumber;
    let pfaName = employee.pfaName;
    let pensionAccountNumber = employee.pensionAccountNumber;
    let levelName = employee.levelName;
    let fTag =
      Math.random().toString(9).substring(2, 7) +
      Math.random().toString(36).substring(2, 4);
    let tag = 'EMP' + fTag;

    Level.findOne({ name: employee.levelName })
      .where('is_delete')
      .equals(0)
      .then((level) => {
        if (level != null) {
          Employee.findOne({ email })
            .where('is_delete')
            .equals(0)
            .then((employeeRecord) => {
              if (!employeeRecord) {
                const newEmployee = new Employee({
                  tag,
                  name,
                  email,
                  designation,
                  department,
                  level: level._id,
                  stateResidence,
                  bankName,
                  accountNumber,
                  pfaName,
                  pensionAccountNumber,
                  levelName,
                });
                newEmployee
                  .save()
                  .then((employeeDetails) => {
                    console.log(employeeDetails);
                  })
                  .catch((err) => console.log(err));
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  });
};

module.exports = router;
