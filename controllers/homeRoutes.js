const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth');


// get all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    // attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
}

);
router.get('/signup', (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

router.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ],
       
                },
            ],
        });

        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }


    } catch (err) {     
        res.status(500).json(err);
    }
}
);

router.get('/posts-comments', auth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts-comments', {
            layout: 'dashboard',
            posts,
        });
    } catch (err) {
        res.redirect('login');
    }
}
);

module.exports = router;