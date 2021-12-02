const billboardRouter = require('express').Router();
const add = require('../controllers/billboard');
const checkToken = require('../middlewares/jwt');
const {
  checkAdminStrict,
  checkIdentity,
} = require('../middlewares/user-check');

billboardRouter.get('/projects', checkToken, checkIdentity);
billboardRouter.post('/add/:id', checkToken, checkAdminStrict, add);
module.exports = billboardRouter;
