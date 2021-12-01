const { request, response } = require('express');
const logError = require('../../helpers/error-format');
const isEmpty = require('../../helpers/is-empty');
const Project = require('../../models/project');
const User = require('../../models/user');

/**
 * activate middleware /api/(project|users)/activate, activate an
 * user or project, this action required admin privileges
 * @param {request} req http request
 * @param {response} res http response
 */
const activate = async (req = request, res = response) => {
  const { id } = req.params;
  // get the activation type
  const type = req.path.search(/users/) !== -1 ? 'usuario' : 'proyecto';
  try {
    // update document if exists
    const dbModel = type === 'usuario' ? User : Project;
    const updatedDocument = await dbModel.findByIdAndUpdate(
      id,
      { active: true, status: true },
      { new: true },
    );
    if (isEmpty(updatedDocument)) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontro ningún ${type} con el ID: ${id}`,
      });
    }
    return res.status(200).json({
      ok: true,
      msg: `Se activo el ${type} con el ID: ${id}`,
    });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
    });
  }
};

module.exports = activate;
