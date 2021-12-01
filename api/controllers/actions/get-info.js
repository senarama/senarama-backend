const { request, response } = require('express');
const logError = require('../../helpers/error-format');
const { extractUserInfo, extractProjectInfo } = require('../../helpers/extractor');
const isEmpty = require('../../helpers/is-empty');
const Project = require('../../models/project');
const User = require('../../models/user');

const getProjectInfo = async (req = request, res = response) => {
  let userType = req.userInfo.same ? 'same' : false;
  if (!userType) {
    userType = req.userInfo.admin ? 'admin' : 'other';
  }
  try {
    const projectDocument = await Project.findById(req.params.id);
    if (isEmpty(projectDocument)) {
      return res.status(404).json({
        ok: false,
        msg: 'Proyecto no encontrado',
      });
    }
    const projectData = extractProjectInfo(projectDocument, userType);
    return res.status(200).json({
      ok: true,
      msg: 'Información del proyecto cargada',
      projectData,
    });
  } catch (error) {
    logError(error);
    return res.status(500).json({
      ok: false,
      msg: 'Contact website admin',
    });
  }
};

const getUserInfo = async (req = request, res = response) => {
  let userType = req.userInfo.same ? 'same' : false;
  if (!userType) {
    userType = req.userInfo.admin ? 'admin' : 'other';
  }
  try {
    const userDocument = await User.findById(req.params.id);

    if (isEmpty(userDocument)) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado',
      });
    }

    const userData = extractUserInfo(
      userDocument.toObject(),
      userType,
    );

    return res.status(200).json({
      ok: true,
      msg: 'Información de usuario cargada',
      userData,
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

module.exports = { getProjectInfo, getUserInfo };
