const { request, response } = require('express');
const isEmpty = require('../helpers/is-empty');
const User = require('../models/user');

const checkAdmin = async (req = request, res = response, next = () => {}) => {
  const { uid, role } = req.userInfo;
  try {
    const userDocument = await User.findById(uid);
    if (isEmpty(userDocument)) {
      return res.status(401).json({
        ok: false,
        msg: 'Fallo la verificación de identidad',
        des: 'token uid not match with any user in DB',
      });
    }

    if (!(userDocument.role === role && userDocument.role === 'admin')) {
      return res.status(403).json({
        ok: false,
        msg: 'Necesita ser administrador para realizar esta acción',
        des: 'User role not match',
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
      des: error.message,
    });
  }
};

module.exports = {
  checkAdmin,
};
