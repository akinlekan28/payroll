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
const presentYear = date.getFullYear();

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

router.get('/payoverview', protect, (req, res) => {
    Payslip.find({is_delete:  0}).where('presentYear').equals(presentYear)
    .then(payslips => {

        let jan = 0;
        let feb = 0;
        let mac = 0;
        let apr = 0;
        let may = 0;
        let jun = 0;
        let jul = 0;
        let aug = 0;
        let sep = 0;
        let oct = 0;
        let nov = 0;
        let dec = 0;

        payslips.forEach(payslipItem => {
            switch(payslipItem.presentMonth){
                case "January":
                    jan += payslipItem.netPay;
                    break;
                case "February":
                    feb += payslipItem.netPay;
                    break;
                case "March":
                    mac += payslipItem.netPay ;
                    break;
                case "April":
                    apr += payslipItem.netPay
                    break;
                case "May":
                    may += payslipItem.netPay;
                    break;
                case "June":
                    jun += payslipItem.netPay ;
                    break;
                case "July":
                    jul += payslipItem.netPay;
                    break;
                case "August":
                    aug += payslipItem.netPay;
                    break;
                case "September":
                    sep += payslipItem.netPay ;
                    break;
                case "October":
                    oct += payslipItem.netPay;
                    break;
                case "November":
                    nov += payslipItem.netPay;
                    break;
                case "December":
                    dec += payslipItem.netPay ;
                    break;
                default: 1+1;
            }
        })

        january = jan.toFixed(2)
        february = feb.toFixed(2)
        march = mac.toFixed(2)
        april = apr.toFixed(2)
        may = may.toFixed(2)
        june = jun.toFixed(2)
        july = jul.toFixed(2)
        august = aug.toFixed(2)
        sepetember = sep.toFixed(2)
        october = oct.toFixed(2)
        november = nov.toFixed(2)
        december = dec.toFixed(2)

        const overview = {
            january,
            february,
            march,
            april,
            may,
            june,
            july,
            august,
            sepetember,
            october,
            november,
            december,
        }
        res.json(overview)
    })
    .catch(err => console.log(err))
});

module.exports = router;