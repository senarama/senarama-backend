const uploadRouter = require('express').Router();
const { getFile } = require('../controllers/upload');
const checkToken = require('../middlewares/jwt');
const { checkIdentity, checkUserStrict } = require('../middlewares/user-check');

uploadRouter.delete(
  '/upload/images/projects/:filename',
  checkToken,
  checkIdentity,
);
uploadRouter.delete(
  '/upload/images/users/:filename',
  checkToken,
  checkIdentity,
);

uploadRouter.get(
  '/uploads/images/projects/:filename',
  checkToken,
  checkIdentity,
);
uploadRouter.get(
  '/uploads/images/users/:filename',
  checkToken,
  checkIdentity,
);

uploadRouter.get(
  '/uploads/users/:id/:filename',
  checkToken,
  checkIdentity,
  getFile,
);

// uploadRouter.get('/uploads/videos/projects/:filename')
uploadRouter.get(
  '/uploads/videos/users/:filename',
  checkToken,
  checkIdentity,
);

uploadRouter.post('/upload/project/image');

// uploadRouter.post('/upload/project/video')
uploadRouter.post(
  '/upload/user/image',
  checkToken,
  checkUserStrict,
);

uploadRouter.post('/upload/user/video');

uploadRouter.put(
  '/upload/project/image/:id/update',
  checkToken,
  checkIdentity,
);
uploadRouter.put(
  '/upload/user/image/:id/update',
  checkToken,
  checkIdentity,
);

uploadRouter.put(
  '/upload/user/video/:id/update',
  checkToken,
  checkIdentity,
);

uploadRouter.post(
  '/upload/user/document',
  checkToken,
);

module.exports = uploadRouter;
