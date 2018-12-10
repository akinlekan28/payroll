const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function EmployeeInput(data){
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.designation = !isEmpty(data.designation) ? data.designation : '';
  data.department = !isEmpty(data.department) ? data.department : '';

  if(!validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if(validator.isEmpty(data.name)){
    errors.name = 'Name field is required'
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (validator.isEmpty(data.designation)) {
    errors.designation = 'Designation field is required'
  }

  if (validator.isEmpty(data.department)) {
    errors.department = 'Department field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};