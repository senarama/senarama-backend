const { request, response } = require('express');
const logError = require('../helpers/error-format');
const isEmpty = require('../helpers/is-empty');
// const Billboard = require('../models/billboard');
const Project = require('../models/project');

const add = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const projectDocument = await Project.find({ onListing: false });
    if (isEmpty(projectDocument)) {
      return res.status(404).json({
        ok: false,
        msg: `No se encontro ningún proyecto con el ID: ${id}`,
      });
    }
    return res.status(200).json({
      ok: true,
      msg: 'Datos de cartelera cargados',
      projectDocument,
    });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      ok: true,
      msg: 'Contact the website admin',
    });
  }
};

module.exports = add;
