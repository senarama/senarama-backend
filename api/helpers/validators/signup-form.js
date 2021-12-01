const validator = require('validator').default;
const isEmpty = require('../is-empty');

const checkSignUpInput = (reqBody, isUpdate = false) => {
  const data = {};
  const errors = {};

  // signup data
  data.description = isEmpty(reqBody.description) ? '' : reqBody.description;
  data.lastName = isEmpty(reqBody.lastName) ? '' : reqBody.lastName;
  data.password = isEmpty(reqBody.password) ? '' : reqBody.password;
  data.profile = isEmpty(reqBody.profile) ? null : reqBody.profile;
  data.senaCode = isEmpty(reqBody.senaCode) ? null : reqBody.senaCode;
  data.social = isEmpty(reqBody.social) ? [] : reqBody.social;
  data.userName = isEmpty(reqBody.userName) ? '' : reqBody.userName;
  data.type = isEmpty(reqBody.userType) ? 'normal' : reqBody.userType;

  if (!isUpdate) {
    data.active = false;
    data.email = isEmpty(reqBody.email) ? '' : reqBody.email;
    data.idType = isEmpty(reqBody.idType) ? '' : reqBody.idType;
    data.role = isEmpty(reqBody.role) ? 'senarauta' : reqBody.role;
    data.state = false;
    data.userID = isEmpty(reqBody.userID) ? null : reqBody.userID;
  } else {
    delete data.active;
    delete data.email;
    delete data.idType;
    delete data.userID;
    delete data.role;
    delete data.state;
  }

  // email check
  if (isEmpty(data.email)) {
    errors.email = 'Este campo es obligatorio';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'El email no es valido';
  }

  // userName
  if (isEmpty(data.userName)) {
    errors.userName = 'El nombre es obligatorio';
  } else if (!validator.isAscii(data.userName)) {
    errors.userName = 'Solo se permiten caracteres alfanumericos';
  }

  // lastName
  if (isEmpty(data.lastName)) {
    errors.lastName = 'El apellido es obligatorio';
  } else if (!validator.isAscii(data.lastName)) {
    errors.lastName = 'Solo se permiten caracteres alfanumericos';
  }

  // userID
  if (isEmpty(data.userID)) {
    errors.userID = 'Este campo es obligatorio';
  } else if (!validator.isNumeric(data.userID)) {
    errors.userID = 'Solo se permiten números';
  }

  // idType
  if (isEmpty(data.idType)) {
    errors.idType = 'Esta información es requerida';
  }

  // password
  if (isEmpty(data.password)) {
    errors.password = 'Este campo no puede estar vacio';
  } else if (!validator.isLength(data.password, { min: 8 })) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres';
  }

  // description
  if (isEmpty(data.description)) {
    errors.description = 'Esta información es obligatoria';
  }

  return {
    errors,
    data,
    isValid: isEmpty(errors),
    formName: 'signup',
  };
};

module.exports = checkSignUpInput;
