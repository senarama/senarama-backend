const { request, response } = require('express');
const logError = require('../helpers/error-format');
const isEmpty = require('../helpers/is-empty');
const Project = require('../models/project');
const User = require('../models/user');

const create = async (req = request, res = response) => {
  const { uid } = req.userInfo;
  try {
    const projectDocument = await Project.findOne(
      { projectTitle: req.formInfo.title },
    );
    if (!isEmpty(projectDocument)) {
      return res.status(409).json({
        ok: false,
        msg: 'Actualmente existe un proyecto con este titulo',
      });
    }
    const projectModel = new Project(req.formInfo);
    projectModel.uid = uid;
    await projectModel.save();
    return res.status(201).json({
      ok: true,
      msg: 'Proyecto creado',
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

const update = async (req = request, res = response) => {
  const { uid } = req.userInfo;
  try {
    // if (!uid === req.formInfo.userUID) {
    //   return res.status(403).json({
    //     ok: false,
    //     msg: 'Fallo la verificación de identidad',
    //     des: "You aren't the owner ot this project",
    //   });
    // }
    const projectDocument = await User.findOneAndUpdate(
      { _id: req.params.id, uid },
      req.formInfo,
      { new: true },
    );
    if (isEmpty(projectDocument)) {
      return res.status(403).json({
        ok: false,
        msg: 'No tiene permisos para editar este proyecto',
        des: "Your aren't the owner of this project",
      });
    }
    return res.status(200).json({
      ok: true,
      msg: 'Información del proyecto actualizada correctamente',
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

module.exports = { create, update };
