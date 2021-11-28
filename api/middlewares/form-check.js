const { response } = require('express');
const checkLoginInput = require('../helpers/validators/login-form');
const checkProjectInput = require('../helpers/validators/project-form');
const checkSignUpInput = require('../helpers/validators/signup-form');

const VALIDATOR = {
  LOGIN: checkLoginInput,
  PROJECT: checkProjectInput,
  SIGNUP: checkSignUpInput,
};

const checkForm = (validator = checkLoginInput) => {
  const checkFormInfo = (req, res = response, next = () => {}) => {
    const {
      errors,
      data,
      isValid,
      formName,
    } = validator(req.body);
    if (!isValid) {
      res.status(400).json({
        ok: false,
        msg: 'Se encontraron algunos errores en la información',
        errors,
      });
    } else {
      req.formInfo = { ...data };
      req.formName = formName;
      next();
    }
  };
  return checkFormInfo;
};

module.exports = { checkForm, VALIDATOR };
