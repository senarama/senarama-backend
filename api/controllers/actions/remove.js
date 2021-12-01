const { request, response } = require('express');
const logError = require('../../helpers/error-format');
const isEmpty = require('../../helpers/is-empty');
const Project = require('../../models/project');
const User = require('../../models/user');

const remove = async (req = request, res = response) => {
  const uid = req.params.id;
  const type = req.path.search(/users/) !== -1 ? 'usuario' : 'proyecto';
  const dbModel = type === 'usuario' ? User : Project;
  try {
    const userDocument = await dbModel.findByIdAndRemove(uid);
    if (isEmpty(userDocument)) {
      return res.status(200).json({
        ok: true,
        msg: `${type} borrado correctamente`,
        des: `El ${type} no se encuentra registrado`,
      });
    }

    res.status(200).json({
      ok: true,
      msg: `${type} borrado correctamente`,
    });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
      des: error.message,
    });
  }
};

module.exports = remove;
