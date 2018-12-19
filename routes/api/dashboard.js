const express = require("express");
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const Employee = require('../../models/Employee');
const Level = require('../../models/Level');
const Exception = require('../../models/Exception');
const User = require('../../models/User');

router.get('/counts', protect, (req, res) => {
    Employee.countDocuments()
    .then(employeeCount => {
        Level.countDocuments()
        .then(levelCount => {
            Exception.countDocuments()
            .then(exceptionCount => {
                User.countDocuments()
                .then(adminCount => {
                    const totalCount = {
                        adminCount,
                        employeeCount,
                        levelCount,
                        exceptionCount
                    }
                    return res.json(totalCount);
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
});

router.get('/lastfive', protect, (req, res) => {
    User.find()
    .limit(5)
    .sort({date: -1})
    .then(user => res.json(user))
    .catch(err => console.log(err))
});

module.exports = router;