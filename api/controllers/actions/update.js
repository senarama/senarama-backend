const { request, response } = require('express');
const logError = require('../../helpers/error-format');
const isEmpty = require('../../helpers/is-empty');
const User = require('../../models/user');

const update = async (req = request, res = response) => {
  try {
    if (!req.userInfo.same && !req.userInfo.admin) {
      return res.status(403).json({
        ok: false,
        msg: 'Fallo la verificación de identidad',
      });
    }
    if (req.userInfo.same || req.userInfo.admin) {
      const userDocument = await User.findByIdAndUpdate(
        req.params.id,
        req.formInfo,
        { new: true },
      );
      if (isEmpty(userDocument)) {
        return res.status(403).json({
          ok: false,
          msg: 'Fallo la verificación de identidad',
          des: `No se encontro un usuario con este ID: ${req.params.id}`,
        });
      }

      return res.status(200).json({
        ok: true,
        msg: 'Información actualizada correctamente',
      });
    }
  } catch (error) {
    logError(error);
    return res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
      des: error.message,
    });
  }
};

module.exports = update;
