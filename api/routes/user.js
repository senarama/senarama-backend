const userRouter = require('express').Router();
const activate = require('../controllers/actions/activate');
const { getAllUsers } = require('../controllers/actions/get-all');
const remove = require('../controllers/actions/remove');
const { getUserInfo } = require('../controllers/actions/get-info');
const { signup, login } = require('../controllers/user');
const { checkForm, VALIDATOR } = require('../middlewares/form-check');
const checkToken = require('../middlewares/jwt');
const {
  checkAdminStrict,
  checkIdentity,
  checkUserStrict,
} = require('../middlewares/user-check');

userRouter.post('/login', checkForm(VALIDATOR.LOGIN), login);

userRouter.post('/signup', checkForm(VALIDATOR.SIGNUP), signup);

userRouter.get(
  '/users/profile/:id',
  checkToken,
  checkIdentity,
  getUserInfo,
);

userRouter.get(
  '/users/list',
  checkToken,
  checkIdentity,
  getAllUsers,
);
// activate an user
userRouter.post(
  '/users/:id/activate',
  checkToken,
  checkAdminStrict,
  activate,
);

userRouter.delete(
  '/users/:id/delete',
  checkToken,
  checkAdminStrict,
  remove,
);

userRouter.put(
  '/users/:id/update',
  checkToken,
  checkUserStrict,
);

module.exports = userRouter;
