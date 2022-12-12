const router = require('express').Router();
const { User } = require('../../models');

// POST to create a new user
router.post('/', async (req, res) => {
    try {
        const newUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.username = newUserData.username;
            req.session.logged_in = true;

            res.status(200).json(newUserData);
        });  
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST login
router.post('/login', async (req, res) => {
    try {
        const newUserData = await User.findOne({
        where: {
            username: req.body.username
        },
    });

    if (!newUserData) {
            res.status(400).json({ message: 'No user found with that username!' });
            return;
        }

        const validPassword = await newUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = newUserData.id;
            req.session.username = newUserData.username;
            req.session.logged_in = true;

            res.json({ user: newUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json({ message: 'No user account found with that username!'})
    }
});

// POST logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// PUT update a user
// router.put('/:id', withAuth, (req, res) => {
//     User.update(req.body, {
//         individualHooks: true,
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(dbUserData => {
//             if (!dbUserData[0]) {
//                 res.status(404).json({ message: 'No user found with this id' });
//                 return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

module.exports = router;
