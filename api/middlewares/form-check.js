const { response } = require('express');
const checkLoginInput = require('../helpers/validators/login-form');
const checkProjectInput = require('../helpers/validators/project-form');
const checkSignUpInput = require('../helpers/validators/signup-form');

const VALIDATOR = {
  LOGIN: checkLoginInput,
  PROJECT: checkProjectInput,
  SIGNUP: checkSignUpInput,
};

/**
 * Check body requests
 * @param {function} validator function to validate the body request
 * @returns 401 | 401 http code if any validation fails
 */
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
      req.formInfo = { ...data }; // save parsed data
      req.formName = formName;
      if (req.formInfo.role === 'admin') {
        res.status(401).json({
          ok: false,
          msg: 'No se puede crear un usuario administrador usando este metodo',
        });
      } else {
        next();
      }
    }
  };
  return checkFormInfo;
};

module.exports = { checkForm, VALIDATOR };
