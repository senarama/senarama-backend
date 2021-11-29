const { request, response } = require('express');
const isEmpty = require('../../helpers/is-empty');
const User = require('../../models/user');

/**
 * activate middleware /api/(project|users)/activate, activate an
 * user or project, this action required admin privileges
 * @param {request} req http request
 * @param {response} res http response
 */
const activate = async (req = request, res = response) => {
  const { id } = req.params;
  const type = req.path.search(/users/g) ? 'usuario' : 'proyecto';
  try {
    const updatedDocument = await User.findByIdAndUpdate(
      id,
      { active: true, status: true },
      { new: true },
    );
    if (!isEmpty(updatedDocument)) {
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
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
    });
  }
};

module.exports = activate;
