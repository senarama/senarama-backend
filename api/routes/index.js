const router = require('express').Router();

router.use('/billboard', require('./billboard'));
router.use('/projects', require('./project')); // projects
router.use(require('./upload')); // uploads
router.use(require('./user')); // signup, login and others user actions

module.exports = router;
