const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const Employee = require('../../models/Employee');
const Level = require('../../models/Level');
const Exception = require('../../models/Exception');
const User = require('../../models/User');
const Payslip = require('../../models/Payslip');
const OneoffPayment = require('../../models/Oneoffpayment');

let date = new Date();
const presentMonth = date.toLocaleString("en-us", { month: "long" });

router.get('/analytics', protect, (req, res) => {
    Employee.countDocuments().where('is_delete').equals(0)
    .then(employeeCount => {
        Level.countDocuments().where('is_delete').equals(0)
        .then(levelCount => {
            Exception.countDocuments().where('is_delete').equals(0)
            .then(exceptionCount => {
                User.countDocuments().where('is_delete').equals(0)
                .then(adminCount => {
                    Employee.countDocuments().where('is_delete').equals(1)
                    .then(deletedEmployees => {
                        Payslip.countDocuments({is_delete: 0}).where('presentMonth').equals(presentMonth)
                        .then(payslipCount => {
                            OneoffPayment.countDocuments().where('is_delete').equals(0)
                            .then(oneOff => {
                                Employee.find().where('is_delete').equals(0)
                                .limit(5)
                                .sort({date: -1})
                                .then(employee => {

                                    const totalCount = {
                                        employee,
                                        adminCount,
                                        employeeCount,
                                        levelCount,
                                        exceptionCount,
                                        deletedEmployees,
                                        payslipCount,
                                        oneOff
                                    }
                                    return res.json(totalCount);
                                })
                                .catch(err => res.status(404).json({message: "Employees not found"}))
                            })
                            .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
});

module.exports = router;