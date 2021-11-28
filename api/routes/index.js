const router = require('express').Router();

router.use(require('./user'));
router.use('/project', require('./project'));
router.use(require('./upload'));

module.exports = router;
