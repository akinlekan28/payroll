const express = require('express');
const router = express.Router();
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const Exception = require('../../models/Exception');

//@route  Post api/exception/:id
//@desc Create Employee salary exception route
//@access Private
router.post('/:id', protect, (req, res) => {

    const errors = {};

    if(req.body.amount == ''){
        errors.amount = "Amount field cannot be empty";
        return res.status(400).json(errors)
    }

    const newSalaryException = new Exception({
        amount: req.body.amount,
        employee: req.params.id
    });

    newSalaryException.save()
    .then(exceptionSalary => res.json(exceptionSalary))
    .catch(err => res.status(400).json({message: "Error saving salary exception"}))

});


module.exports = router;