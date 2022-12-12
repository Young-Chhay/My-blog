const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const blogsRoutes = require('./blogRoutes')

// End Points
router.use('/users', userRoutes);
router.use('/blogs', blogsRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
