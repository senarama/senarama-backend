const projectRouter = require('express').Router();
const activate = require('../controllers/actions/activate');
const { getAllProjects } = require('../controllers/actions/get-all');
const { getProjectInfo } = require('../controllers/actions/get-info');
const remove = require('../controllers/actions/remove');
const { create, update } = require('../controllers/project');
const { checkForm, VALIDATOR } = require('../middlewares/form-check');
const checkToken = require('../middlewares/jwt');
const { checkAdminStrict, checkIdentity, checkUserStrict } = require('../middlewares/user-check');

projectRouter.delete(
  '/:id/delete',
  checkToken,
  checkIdentity,
  remove,
);
projectRouter.get(
  '/all',
  checkToken,
  checkIdentity,
  getAllProjects,
);

projectRouter.get(
  '/:id',
  checkToken,
  checkIdentity,
  getProjectInfo,
);

projectRouter.get(
  '/:uid/all',
  checkToken,
  checkIdentity,
  getAllProjects,
);
projectRouter.post(
  '/:id/activate',
  checkToken,
  checkAdminStrict,
  activate,
);

projectRouter.post(
  '/create',
  checkForm(VALIDATOR.PROJECT),
  checkToken,
  create,
);
projectRouter.post(
  '/:id/update',
  checkForm(VALIDATOR.PROJECT),
  checkToken,
  checkUserStrict,
  update,
);

module.exports = projectRouter;
