const userRouter = require('express').Router();

userRouter.post('/login');
userRouter.post('/signup');
userRouter.get('/users/profile/:id');
userRouter.get('/users/list');
userRouter.post('/users/:id/activate');
userRouter.delete('/users/:id/delete');
userRouter.put('/users/:id/update');

module.exports = userRouter;
