const router = require('express').Router();
const loginRoute = require('./loginRoute');
const logoutRoute = require('./logoutRoute');
const postRoutes = require('./postRoutes');
const signupRoutes = require('./signupRoutes');
const userRoutes = require('./userRoutes');




router.use('/users', userRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoute);
router.use('/post', postRoutes);
router.use('/logout', logoutRoute);

module.exports = router;    