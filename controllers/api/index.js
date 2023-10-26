const router = require('express').Router();
const userRoutes = require('./userRoutes');
const signupRoutes = require('./signupRoutes');
// const postRoutes = require('./postRoutes'); add post routes if needed
const loginRoute = require('./loginRoute');

router.use('/users', userRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoute);
// router.use('/posts', postRoutes); add post routes if needed

module.exports = router;    