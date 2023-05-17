const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyEmail } = require('../controllers/authController');
const { check } = require('express-validator');
const passport = require('passport');

router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.login
);

router.post('/forgot-password', authController.forgotPassword);

router.post(
  '/reset-password',
  [check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })],
  authController.resetPassword
);

router.get('/verify/:token', verifyEmail);


//Social Authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/'); // Redirect to the desired page after successful login
});


router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true,
}));


module.exports = router;
