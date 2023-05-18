const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const seekersRouter = require('./seekers');

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/seekers', seekersRouter)

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


module.exports = router;