const projectRouter = require('express').Router();

projectRouter.delete('/:id/delete');
projectRouter.get('/all');
projectRouter.get('/:id');
projectRouter.get('/:uid/all');
projectRouter.post('/:id/activate');
projectRouter.post('/create');
projectRouter.post('/:id/update');

module.exports = projectRouter;
