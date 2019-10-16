const express = require('express');
const router  = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');
require('../passport');


/* POST login. */
router.post('/login', function (req, res, next) {

    passport.authenticate('login', {session: false}, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user, 'your_jwt_secret');

            return res.json({user, token});
        });
    })
    (req, res);

});
router.post('/register', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
    res.json({ 
      message : 'Signup successful',
      user : req.user 
    });
  });
module.exports = router;