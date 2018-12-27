const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function bonusInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.amount = !isEmpty(data.amount) ? data.amount : '';
  data.level = !isEmpty(data.level) ? data.level : '';

  if(validator.isEmpty(data.name)){
    errors.name = 'Bonus name is required';
  }

  if (validator.isEmpty(data.amount)) {
    errors.amount = 'Amount field is required';
  }

  if (validator.isEmpty(data.level)) {
    errors.level = 'Level field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};