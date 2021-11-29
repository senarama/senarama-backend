const userRouter = require('express').Router();
const activate = require('../controllers/actions/activate');
const { signup, login } = require('../controllers/user');
const { checkForm, VALIDATOR } = require('../middlewares/form-check');
const checkToken = require('../middlewares/jwt');
const { checkAdmin } = require('../middlewares/user-check');

userRouter.post('/login', checkForm(VALIDATOR.LOGIN), login);
userRouter.post('/signup', checkForm(VALIDATOR.SIGNUP), signup); // user signup
userRouter.get('/users/profile/:id'); // get single user info
userRouter.get('/users/list'); // get a list of all users
// activate an user
userRouter.post('/users/:id/activate', checkToken, checkAdmin, activate);
userRouter.delete('/users/:id/delete'); // delete an user
userRouter.put('/users/:id/update'); // update user information

module.exports = userRouter;
