const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function oneoffpaymentInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.month = !isEmpty(data.month) ? data.month : "";
  data.costType = !isEmpty(data.costType) ? data.costType : "";
  data.employee = !isEmpty(data.employee) ? data.employee : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Exception name is required";
  }

  if (validator.isEmpty(data.amount)) {
    errors.amount = "Amount field is required";
  }

  if (validator.isEmpty(data.month)) {
    errors.month = "Month field is required";
  }

  if (validator.isEmpty(data.costType)) {
    errors.costType = "Exception type field is required";
  }

  if (validator.isEmpty(data.employee)) {
    errors.employee = "Employee field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
