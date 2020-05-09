const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddProductInput(data) {
  let errors = {};
  if (validator.isEmpty(data.productid)) {
    errors.productid = "productid field is required";
  }

  if (validator.isEmpty(data.productName)) {
    errors.productName = "productName field is required";
  }

  if (!validator.isNumeric(data.productPrice.toString())) {
    errors.productPrice = "productPrice field should be numeric";
  }

  if (!validator.isNumeric(data.qnty.toString())) {
    errors.qnty = "qnty field should be numeric";
  }

  if (isEmpty(errors)) {
    if (parseFloat(data.productPrice) <= 0) {
      errors.productPrice = "productPrice field should be bigger than 0";
    }
    if (parseInt(data.qnty) <= 0) {
      errors.qnty = "qnty field should be bigger than 0";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
