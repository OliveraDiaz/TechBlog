const router = require('express').Router();
const { Post, User } = require('../../models');
// const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [{ model: User }],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.status(200).json(posts);
    }catch (err) {
        res.status(500).json(err);
    }
}
);


router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
        });

        const singlePost = post.get({ plain: true });
        res.status(200).json(singlePost);
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);

//new post
router.post('/', async (req, res) => {
    try{
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });
        res.status(200).json(post, {message: 'Post created!'});
    }catch (err) {
        res.status(500).json(err);
    }
}
);


//update post
router.put('/:id', async (req, res) => {
    try{
        const updatePost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(updatePost, {message: 'Post updated!'});
    }catch (err) {
        res.status(500).json(err);
    }
}
);

//delete post
router.delete('/:id', async (req, res) => {
    try{
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(deletePost, {message: 'Post deleted!'});
    }catch (err) {
        res.status(500).json(err);
    }
}
);


module.exports = router;