const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const postRoutes = require('./postRoutes'); add post routes if needed

router.use('/users', userRoutes);

// router.use('/posts', postRoutes); add post routes if needed

module.exports = router;