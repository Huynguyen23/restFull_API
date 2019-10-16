const express = require("express");
const User = require("../models/User");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const router = express.Router();
require('../passport');

// router.post(
//   "/register",
//    passport.authenticate("local", { session: false }),
//    async (req, res, next) => {
//     res.json({
//       message: "Signup successful",
//       user: req.user
//     });
//   }
// );
// router.post("/login", async (req, res, next) => {
//   passport.authenticate("login", async (err, user, info) => {
//     try {
//       if (err || !user) {
//         const error = new Error("An Error occured");
//         return next(error);
//       }
//       req.login(user, { session: false }, async error => {
//         if (error) return next(error);
//         const body = { _id: user._id, email: user.email }; 
//         const token = jwt.sign({ user: body }, "top_secret");
//         return res.json({ token });
//       });
//     } catch (error) {
//       return next(error);
//     }
//   })(req, res, next);
// });
// // router.post('/users/login', async(req, res) => {
// //     //Login a registered user
// //     try {
// //         const { email, password } = req.body
// //         const user = await User.findByCredentials(email, password)
// //         if (!user) {
// //             return res.status(401).send({error: 'Login failed! Check authentication credentials'})
// //         }
// //         const token = await user.generateAuthToken()
// //         res.send({ user, token })
// //     } catch (error) {
// //         res.status(400).send(error)
// //     }

// // })
// router.get("/me", auth, async (req, res) => {
//   // View logged in user profile
//   res.send(req.user);
// });



router.post('/register', (req, res, next) =>{
    let newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    User.addUser(newUser, (error, user)=>{
        if(error){
            res.json({success: false, msg: 'Failed'});
        }else{
            res.json({success: true, msg: 'Success'});
        }
    })
});
router.post('/login', function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {
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
router.get('/me', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
    res.json({
        user: req.user
    })
})
module.exports = router;
