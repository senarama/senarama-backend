const userRouter = require('express').Router();
const activate = require('../controllers/actions/activate');
const { signup, login } = require('../controllers/user');
const { checkForm, VALIDATOR } = require('../middlewares/form-check');
const checkToken = require('../middlewares/jwt');
const {
  checkAdminStrict,
  checkIdentity,
  checkUserStrict,
} = require('../middlewares/user-check');

userRouter.post('/login', checkForm(VALIDATOR.LOGIN), login);
userRouter.post('/signup', checkForm(VALIDATOR.SIGNUP), signup); // user signup
userRouter.get('/users/profile/:id', checkToken, checkIdentity); // get single user info
userRouter.get('/users/list', checkToken, checkIdentity); // get a list of all users
// activate an user
userRouter.post('/users/:id/activate', checkToken, checkAdminStrict, activate);
userRouter.delete('/users/:id/delete', checkToken, checkAdminStrict); // delete an user
userRouter.put('/users/:id/update', checkToken, checkUserStrict); // update user information

module.exports = userRouter;
