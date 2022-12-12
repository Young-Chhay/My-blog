const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// create new blog post 
router.post('/', withAuth, async (req, res) => {
    try {
        const createBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
        res.status(200).json(createBlog);
        } catch (err) {
        res.status(500).json(err);
        }
});

//update routes for blogs
router.put('/:id', withAuth, async (req,res) => {
    try {
        const BlogData = await Blog.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if(!BlogData) {
            res.status(404).json({
                message: 'specific blog not found'
            });
            return;
        }
        res.status(200).json(BlogData);
        } catch (err) {
        res.status(500).json(err);
    }
});

// delete route for Blogs
router.delete('/:id', withAuth, async (req,res) => {
    try {
        const BlogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!BlogData) {
            res.status(404).json({
                message: 'specific blog not found'
            });
            return;
        }
        res.status(200).json(BlogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;