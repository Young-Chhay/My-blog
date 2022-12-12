const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", withAuth, async (req, res) => {
    try {
      const userId = req.session.user_id;
      const blogData = await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
        where: { user_id: userId },
      });
      let blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      res.render("dashboard", {
        blogs,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/newpost', withAuth, (req, res) => {
   res.render("new-post", { logged_in: req.session.logged_in });
});

router.get("/:id", withAuth, async (req, res) => {
    try {
      const allPostsData = await Blog.findByPk(req.params.id, {});
      if (allPostsData) {
        const blog = allPostsData.get({ plain: true });
  
        res.render("edit-post", { blog, logged_in: req.session.logged_in });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// router.get('/edit/:id', withAuth, async (req, res) => {
//     try {
//         const allPostsData = await Blog.findByPk(req.params.id);

//         if (allPostsData) {
//             const userPosts = allPostsData.get({ plain: true });
//             res.render('edit-post', {
//                 layout: 'dashboard',
//                  userPosts,
//                 });
//         } else {
//             res.status(404).end();
//         }
//     } catch (err) {
//         res.redirect('login');
//     }
// });

module.exports = router;
