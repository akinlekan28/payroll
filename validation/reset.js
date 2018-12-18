const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};