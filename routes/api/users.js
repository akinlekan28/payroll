const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const mailer = require('@sendgrid/mail');
mailer.setApiKey(keys.sendGridKey);

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateResetInput = require('../../validation/reset');
const validateNewInput = require('../../validation/newpassword');
const validateRoleInput = require('../../validation/role');

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
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        errors.email = 'Email Already exists';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

//@route  Post api/users/login
//@desc Login user route
//@access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          //User match
          const payload = {
            id: user.id,
            name: user.name,
            is_admin: user.is_admin,
          }; //Create JWT Payload

          //Sign token
          jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 7200 },
            (e, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
    })
    .catch((err) => console.log(err));
});

//@route  Get api/users/current
//@desc Returns current user route
//@access Private

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

//@route  Get api/users/all
//@desc Get all users
//@access Private

router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.find({ is_delete: 0 })
      .then((users) => res.json(users))
      .catch((err) => console.log(err));
  }
);

//@route  Post api/users/assignrole
//@desc asign user role
//@access Private

router.post(
  '/assignrole',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoleInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userFields = {};

    if (req.body.user) userFields.user = req.body.user;
    if (req.body.role) userFields.is_admin = req.body.role;

    User.findOne({ _id: req.body.user })
      .where('is_delete')
      .equals(0)
      .then((user) => {
        if (user) {
          let role = parseInt(req.body.role);
          let currentUser = req.body.currentUser;
          let userId = JSON.stringify(user._id).replace(
            /^"(.*)"$/,
            '$1'
          );
          let loggedPrivilege = req.body.loggedPrivilege;

          if (userId === currentUser) {
            errors.role = 'You cannot set current logged user role';
            return res.status(400).json(errors);
          }

          if (loggedPrivilege === 0) {
            errors.role = 'You dont have the appropriate privileges';
            return res.status(400).json(errors);
          }

          if (user.is_admin === role) {
            errors.role = 'User already has this role';
            return res.status(400).json(errors);
          }

          User.findOneAndUpdate(
            { _id: req.body.user },
            { $set: userFields },
            { new: true }
          )
            .then((user) => res.status(200).json({ success: true }))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
);

//@route  Post api/users/forgotpassword
//@desc Send resetpassword token
//@access Public

router.post('/forgotpassword', (req, res) => {
  const { errors, isValid } = validateResetInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }

      let token = token1();

      const resetUser = {
        email: req.body.email,
        name: user.name,
        token: token,
        password: user.password,
        expiry: Date.now() + 86400000,
      };

      User.findOneAndUpdate(
        { name: user.name },
        { $set: resetUser },
        { new: true }
      )
        .then((user) => {
          const resetMessage = {
            to: `${user.email}`,
            from: 'no-reply@payeroll.app',
            subject: 'Password Reset',
            html: `<html>
                        <head>
                          <title>Forget Password Email</title>
                        </head>
                        <body>
                          <div>
                            <h3>Dear ${user.name},</h3>
                            <p>You requested for a password reset on Payeroll, kindly use this <a href="https://${req.headers.host}/resetpassword/${user.token}">link</a> to reset your password</p>
                            <br>
                            <p>Cheers!</p>
                          </div>
                        </body>
                      </html>`,
          };

          mailer
            .send(resetMessage)
            .then(() => {
              return res
                .status(200)
                .json({
                  success: 'Password link sent successfully!',
                });
            })
            .catch(() => {
              errors.email = 'Error sending password reset link';
              return res.status(400).json(errors);
            });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//@route  Post api/users/forgotpassword
//@desc Reset user password
//@access Public

router.post('/resetpassword/:token', (req, res) => {
  const { errors, isValid } = validateNewInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ token: req.params.token })
    .then((user) => {
      if (!user.token) {
        errors.noToken = 'Password reset token not found or invalid!';
        return res.status(404).json(errors);
      } else if (user.expiry < Date.now()) {
        errors.email = 'Password reset token expired!';
        return res.status(422).json(errors);
      }
      if (req.params.token === user.token) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            req.body.password = hash;
            User.findOneAndUpdate(
              { email: user.email },
              { password: req.body.password },
              { name: user.name }
            )
              .then((user) => {
                res
                  .status(200)
                  .json({
                    user,
                    success: 'Password successfully changed!',
                  });
              })
              .catch((err) => console.log(err));
          });
        });
      } else {
        errors.email = 'Password reset token does not match';
        return res.status(400).json(errors);
      }
    })
    .catch((err) => {
      errors.noToken = 'Password reset token not found or invalid!';
      return res.status(404).json(errors);
    });
});

const token1 = () => {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 20; i++) {
    text += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  }
  return text;
};

module.exports = router;
