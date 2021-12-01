const logError = require('../helpers/error-format');
const isEmpty = require('../helpers/is-empty');
const User = require('../models/user');

const checkIdentity = async (req, res, next) => {
  const { uid, role } = req.userInfo;
  const userUID = req.params.id ? req.params.id : req.params.uid;
  req.userInfo.admin = false;

  try {
    const userDocument = await User.findById(uid);
    if (isEmpty(userDocument)) {
      return res.status(403).json({
        ok: false,
        msg: 'No se pudo verificar su identidad',
      });
    }
    if (userDocument.role === role && role === 'admin') {
      req.userInfo.admin = true;
      next();
    } else if (uid === userUID) {
      req.userInfo.same = true;
      next();
    } else {
      req.userInfo.same = false;
      next();
    }
  } catch (error) {
    logError(error);
  }
};

/**
 * Check if a user is admin, if the user role is === admin, sets
 * `req.userInfo.admin` to true, otherwise return 401 | 403 as response code
 * @param {request} req http request
 * @param {response} res http response
 * @param {function} next next middleware
 * @returns [CODE] response
 */
const checkAdminStrict = async (req, res, next) => {
  const { uid, role } = req.userInfo;
  try {
    // check if exists a user with that ID
    const userDocument = await User.findById(uid);
    if (isEmpty(userDocument)) {
      return res.status(401).json({
        ok: false,
        msg: 'Fallo la verificación de identidad',
        des: 'token uid not match with any user in DB',
      });
    }
    // check if user role matches with stored in DB and with the admin keyword
    if (!(userDocument.role === role && userDocument.role === 'admin')) {
      return res.status(403).json({
        ok: false,
        msg: 'Necesita ser administrador para realizar esta acción',
        des: 'User role not match',
      });
    }
    req.userInfo.admin = true;
    next();
  } catch (error) {
    logError(error, true);
    return res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
      des: error.message,
    });
  }
};

/**
 * Checks if uid match with token uid (strict),
 * and set `req.userInfo.same` to true otherwise returns 403
 * the response
 * @param {request} req http request
 * @param {response} res http response
 * @param {function} next next middleware
 * @returns 403 code
 */
const checkUserStrict = (req, res, next) => {
  const { uid } = req.userInfo;
  req.userInfo.admin = false;
  const uidParam = req.params.id;
  // check if a token uid matches with the params uid
  if (uid === uidParam) {
    req.userInfo.same = true;
    next();
  } else {
    return res.status(403).json({
      ok: false,
      msg: 'No se pudo identificar la identidad del usuario',
    });
  }
};

/**
 * Check if uid match with token uid (no strict), and
 * sets `req.userInfo.same` to true, otherwise false.
 *
 * @param {request} req http requests
 * @param {response} _ http response
 * @param {function} next next middleware
 */
const checkUser = (req, _, next) => {
  const { uid } = req.userInfo;
  const uidParam = req.params.id;
  // check if user uid match
  req.userInfo.admin = false;
  if (uid === uidParam) {
    req.userInfo.same = true;
    next();
  } else {
    req.userInfo.same = false;
    next();
  }
};

module.exports = {
  checkAdminStrict,
  checkIdentity,
  checkUser,
  checkUserStrict,
};
