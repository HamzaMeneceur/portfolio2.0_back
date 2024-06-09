const { Router } = require('express');

const adminRouter = require('./adminRouter');
const contactRouter = require('./contactRouter');
const projectRouter = require('./projectRouter');
const router = Router();

router.use('/admin', adminRouter);
router.use('/contacts',contactRouter);
router.use('/projects', projectRouter);
module.exports = router;