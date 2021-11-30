const projectRouter = require('express').Router();
const activate = require('../controllers/actions/activate');
const checkToken = require('../middlewares/jwt');
const { checkAdminStrict, checkIdentity, checkUserStrict } = require('../middlewares/user-check');

projectRouter.delete('/:id/delete', checkToken, checkIdentity);
projectRouter.get('/all', checkToken, checkIdentity);
projectRouter.get('/:id', checkToken, checkIdentity);
projectRouter.get('/:uid/all', checkToken, checkIdentity);
projectRouter.post('/:id/activate', checkToken, checkAdminStrict, activate);
projectRouter.post('/create');
projectRouter.post('/:id/update', checkToken, checkUserStrict);

module.exports = projectRouter;
