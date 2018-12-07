const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');

//Load input validation
const validateRegisterInput = require('../../validation/register');

//Load user model
const User = require('../../models/User');


//@route  Get api/users/register
//@desc Register user route
//@access Public
router.post('/register', (req, res) => {
    
    const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

    User.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user){
            errors.email = 'Email Already exists';
            return res.status(400).json(errors)
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            bycrypt.genSalt(10, (err, salt) => {
                bycrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })
        }
    })
    .catch(err => console.log(err))
})


module.exports = router;