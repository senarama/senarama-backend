const { request, response } = require('express');
const logError = require('../../helpers/error-format');
const { extractUsersInfo, extractProjectsInfo } = require('../../helpers/extractor');
const isEmpty = require('../../helpers/is-empty');
const Project = require('../../models/project');
const User = require('../../models/user');

const getAllProjects = async (req = request, res = response) => {
  const { uid } = req.params;
  let userType = req.userInfo.same ? 'same' : false;
  if (!userType) {
    userType = req.userInfo.admin ? 'admin' : 'other';
  }
  try {
    const dbQuery = { isProject: true };
    if (uid) {
      dbQuery.uid = uid;
      if (userType === 'other') {
        dbQuery.active = true;
      }
    } else if (userType === 'other') {
      dbQuery.active = true;
    }
    const projectsCollection = await Project.find(
      dbQuery,
    );
    console.log(dbQuery);
    if (isEmpty(projectsCollection)) {
      return res.status(200).json({
        ok: true,
        msg: 'No se encontraron projects',
        projectsData: [],
      });
    }
    const projectsData = extractProjectsInfo(projectsCollection, userType);
    return res.status(200).json({
      ok: true,
      msg: 'Lista de proyectos cargada',
      projectsData,
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

const getAllUsers = async (req = request, res = response) => {
  try {
    const userType = req.userInfo.admin ? 'admin' : 'other';
    const usersData = extractUsersInfo(
      await User.find({
        role: 'senarauta',
      }),
      userType,
    );
    // console.log(usersData);
    /* .find({ active: false, role: 'senarauta' }); */
    res.status(200).json({
      ok: true,
      msg: 'Lista de usuarios cargada',
      usersData,
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

module.exports = { getAllUsers, getAllProjects };
