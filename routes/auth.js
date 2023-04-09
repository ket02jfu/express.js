const { Router } = require('express');
const passport = require('passport')
const router = Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(200)
})

module.exports = router;