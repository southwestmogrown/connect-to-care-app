const router = require('express').Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

router.post('/', async (req, res) => {
    const { email, password, userName, userTypeId } = req.body;
    const user = await User.signup({ userTypeId, userName, email, password });

    await setTokenCookie(res, user);

    return res.json({
        user: user
    });
});

module.exports = router;