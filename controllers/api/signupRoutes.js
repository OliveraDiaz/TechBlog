const router = require('express').Router();
const { User } = require('../../models');
const { response } = require('express');



router.post('/', async (req, res) => {
    try {
        const findUser = await User.findOne({ where: { username: req.body.username } });
if (findUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }try {

        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.loggedIn = true;
            res.status(200).json(newUser);
        }
        );
    } catch (err) {
        res.status(400).json(err);
    }
} catch (err) {
    res.status(400).json(err);
}
}
);

module.exports = router;
        