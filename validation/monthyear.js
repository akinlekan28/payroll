const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function monthYear(data) {
  let errors = {};

  data.month = !isEmpty(data.month) ? data.month : '';
  data.year = !isEmpty(data.year) ? data.year : '';

  if (validator.isEmpty(data.month)) {
    errors.month = 'Month field is required';
  }

  if (validator.isEmpty(data.year)) {
    errors.year = 'Year field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};