const keys = require('../config/keys');
const mailer = require('@sendgrid/mail');
const bcrypt = require('bcryptjs');
mailer.setApiKey(keys.sendGridKey);

const User = require('../models/User');

const createSuperAdmin = () => {
  const password = _generatePassword();
  const name = keys.name;
  const email = keys.email;
  const is_admin = 1;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const newUser = new User({
          name,
          email,
          password,
          is_admin,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((registered) => {
                if (registered) {
                  _sendEmail(registered)
                    .then((res) =>
                      console.log('Message successfully sent!')
                    )
                    .catch((err) => console.log(err));
                }
              })
              .catch((err) => console.log(err));
          });
        });
      } else {
        console.log('User email already exist');
      }
    })
    .catch((err) => condsole.log(err));
};

const _generatePassword = () => {
  return Array(30)
    .fill(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    )
    .map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
    .join('');
};

const _sendEmail = (payload) => {
  const data = {
    from: 'Payroll Admin <no-reply@payroll.admin>',
    to: 'akinlekan@gmail.com',
    subject: 'Super Admin Details',
    text: `Hello, Here are your login details\nEmail: ${payload.email}\nPassword: ${payload.password}`,
  };
  return mailer.send(data);
};

module.exports = Object.assign({}, { createSuperAdmin });
