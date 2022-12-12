const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// get all user Blogs from database for homepage to show 
router.get('/', async (req, res) => {
    try {
        const allBlogsData = await Blog.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            },
            ],
        });

        let userBlogs = allBlogsData.map((AllBlogs) =>
            AllBlogs.get({ plain: true }));
        res.render('homepage', { userBlogs, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const allBlogsData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const allCommentData = await Comment.findAll({
            include: [
              {
                model: User,
                attributes: ["username", "id"],
              },
            ],
            where: { blog_id: req.params.id },
          });

        let allComments = allCommentData.map((commentData) => commentData.get({ plain: true }));

        if (allBlogsData) {
            const userBlogs = allBlogsData.get({ plain: true });
            res.render('single-blog', { ...userBlogs, 
                logged_in: req.session.logged_in,
                req_id: req.session.user_id,
                ...allComments,  });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// get route to check if user log in, if not direct them to login page.
router.get("/login", async (req, res) => {
    try {
      if (req.session.logged_in) {
        await res.redirect("/dashboard");
        return;
      }
      res.render("login");
    } catch (err) {
      res.status(500).json(err);
    }
  });

// signup route, check if user is signed in if not redirect to main home page. 
router.get("/signup", async (req, res) => {
    try {
      if (req.session.logged_in) {
        await res.redirect("/dashboard");
        return;
      }
      res.render("signup");
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
