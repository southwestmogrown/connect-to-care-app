const router = require('express').Router();
const { JobSeeker, User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

router.get('/', restoreUser, async (req, res) => {
    const seekers = await JobSeeker.findAll();

    return res.json({ seekers });
});

router.get('/:id', restoreUser, async (req, res) => {
    const userId = req.params.id
    const seeker = await JobSeeker.findByPk(userId);

    return res.json({ seeker });
})

module.exports = router;