const projectRouter = require('express').Router();
const activate = require('../controllers/actions/activate');
const checkToken = require('../middlewares/jwt');
const { checkAdmin } = require('../middlewares/user-check');

projectRouter.delete('/:id/delete');
projectRouter.get('/all');
projectRouter.get('/:id');
projectRouter.get('/:uid/all');
projectRouter.post('/:id/activate', checkToken, checkAdmin, activate);
projectRouter.post('/create');
projectRouter.post('/:id/update');

module.exports = projectRouter;
