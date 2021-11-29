const router = require('express').Router();

router.use(require('./user')); // signup, login and others user actions
router.use('/project', require('./project')); // projects
router.use(require('./upload')); // uploads

module.exports = router;
