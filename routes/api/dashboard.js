const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const Employee = require('../../models/Employee');
const Level = require('../../models/Level');
const Exception = require('../../models/Exception');
const User = require('../../models/User');

router.get('/analytics', protect, (req, res) => {
    Employee.countDocuments()
    .then(employeeCount => {
        Level.countDocuments()
        .then(levelCount => {
            Exception.countDocuments()
            .then(exceptionCount => {
                User.countDocuments()
                .then(adminCount => {
                    Employee.find()
                    .limit(5)
                    .sort({date: -1})
                    .then(employee => {

                        const totalCount = {
                            employee,
                            adminCount,
                            employeeCount,
                            levelCount,
                            exceptionCount
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
});

module.exports = router;