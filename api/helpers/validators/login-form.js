const isEmpty = require('../is-empty');

const checkLoginInput = (reqBody) => {
  const errors = {};
  const data = {};

  data.username = isEmpty(reqBody.username) ? '' : reqBody.username;
  data.password = isEmpty(reqBody.password) ? '' : reqBody.password;

  if (isEmpty(data.username)) {
    errors.username = 'Este campo es obligatorio';
  }
  if (isEmpty(data.password)) {
    errors.password = 'Este campo también es obligatorio';
  }

  return {
    errors,
    data,
    isValid: isEmpty(errors),
    formName: 'login',
  };
};

module.exports = checkLoginInput;
