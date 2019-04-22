const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRoleInput(data) {
  let errors = {};

  data.user = !isEmpty(data.user) ? data.user : '';
  data.role = !isEmpty(data.role) ? data.role : '';

  if (validator.isEmpty(data.user)) {
    errors.user = 'Administrator field is required'
  }

  if (validator.isEmpty(data.role)) {
    errors.role = 'Role field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};