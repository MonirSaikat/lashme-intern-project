const router = require('express').Router();
const userRoutes = require('./users');
const authRoutes = require('./auth');
const postRoutes = require('./posts');
const { authenticated } = require('../utils/jwt');

router.use('/auth', authRoutes);
router.use('/users', authenticated, userRoutes); 
router.use('/posts', authenticated, postRoutes); 

module.exports = router;