const uploadRouter = require('express').Router();

uploadRouter.delete('/upload/images/projects/:filename');
uploadRouter.delete('/upload/images/users/:filename');

uploadRouter.get('/uploads/images/projects/:filename');
uploadRouter.get('/uploads/images/users/:filename');
// uploadRouter.get('/uploads/videos/projects/:filename');
uploadRouter.get('/uploads/videos/users/:filename');

uploadRouter.post('/upload/project/image');
// uploadRouter.post('/upload/project/video');
uploadRouter.post('/upload/user/image');
uploadRouter.post('/upload/user/video');

uploadRouter.put('/upload/project/image/:id/update');
uploadRouter.put('/upload/user/image/:id/update');
uploadRouter.put('/upload/user/video/:id/update');

module.exports = uploadRouter;
