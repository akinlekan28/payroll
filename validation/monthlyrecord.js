const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function monthlyRecord(data) {
  let errors = {};

  data.employee = !isEmpty(data.employee) ? data.employee : '';
  data.month = !isEmpty(data.month) ? data.month : '';

  if(validator.isEmpty(data.employee)){
    errors.employee = 'Employee field is required';
  }

  if (validator.isEmpty(data.month)) {
    errors.month = 'Month field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};