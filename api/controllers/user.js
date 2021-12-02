const { request, response } = require('express');
const { UPLOAD_USER } = require('../config/common');
const logError = require('../helpers/error-format');
const { getName } = require('../helpers/extractor');
const isEmpty = require('../helpers/is-empty');
const { generateToken } = require('../helpers/jwt');
const { hashPasswd, matchPasswd } = require('../helpers/password');
const User = require('../models/user');

/**
 * login middleware: /api/login
 * @param {request} req http request
 * @param {response} res http response
 * @returns undefined
 */
const login = async (req = request, res = response) => {
  const { username: userID, password } = req.formInfo;
  try {
    // find a user with the userID
    const userDocument = await User.findOne({ userID });
    if (isEmpty(userDocument)) {
      // no user found with the userID
      return res.status(401).json({
        ok: false,
        msg: 'Usuario o contraseña invalidos',
        des: 'User not valid', // just for development
      });
    }

    // check if user is active
    if (!userDocument.active) {
      return res.status(401).json({
        ok: false,
        msg: 'Esta cuenta aún no ha sido activada',
      });
    }

    // match password
    const match = await matchPasswd(password, userDocument.password);
    if (!match) {
      return res.status(401).json({
        ok: false,
        msg: 'Usuario o contraseña incorrectos',
        des: 'Contraseña incorrecta',
      });
    }

    // generate token and send in the response
    const token = await generateToken(userDocument);
    return res.status(200).json({
      ok: true,
      msg: 'Sesión iniciada correctamente',
      token,
    });
  } catch (error) {
    // internal error
    logError(error);
    return res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
      des: error.message,
    });
  }
};

/**
 * signup middleware: /api/signup
 * @param {request} req http request
 * @param {response} res http response
 */
const signup = async (req = request, res = response) => {
  const { email, userID } = req.formInfo;
  const data = {
    name: req.files ? getName(req.files.document.name) : '',
    path: UPLOAD_USER.DOCUMENT,
  };

  try {
    const errors = {};
    // try to find users with the same email or userID
    const result = await Promise.all([
      User.findOne({ email }),
      User.findOne({ userID }),
    ]);
    if (!isEmpty(result)) {
      // reject signup and set errors
      if (!isEmpty(result[0])) errors.email = 'Este email no esta disponible';
      if (!isEmpty(result[1])) errors.userID = 'Este número no esta disponible';
      return res.status(409).json({
        ok: false,
        msg: 'Se encontraron errores en la información',
        errors,
      });
    }
    // save the information
    const userDocument = new User(req.formInfo);
    // encrypt password
    userDocument.password = await hashPasswd(userDocument.password);
    // upload the file
    if (req.files) {
      data.path = `${data.path}/${userDocument.id}`;
      req.files.document.mv(`${data.path}/${data.name}`);
      data.path = data.path.slice(1, data.path.length);
      userDocument.document = `${data.path}/${data.name}`;
    }
    await userDocument.save();
    res.status(200).json({
      ok: true,
      msg: 'Información registrada correctamente',
    });
  } catch (error) {
    // internal error
    logError(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
      des: error.message,
    });
  }
};

module.exports = {
  login,
  signup,
};
