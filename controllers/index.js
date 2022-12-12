// make a router using express
const router = require('express').Router();
// connecting routes to each page for express to listen
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashBoardRoutes = require('./dashBoardRoutes');

router.use('/', homeRoutes);
router.use('/dashboard', dashBoardRoutes);
router.use('/api', apiRoutes);

// export router. 
module.exports = router;

