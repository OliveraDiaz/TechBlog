const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth');

router.get('/', auth, async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        const formattedPosts = userPosts.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            userPosts,
            loggedIn: req.session.loggedIn,
        });

    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [{
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        const editPost = post.get({ plain: true });
        res.render('editPost', {
            editPost
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
