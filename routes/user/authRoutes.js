import express from 'express'

//import configs
import passport from '../../config/passport.js'

const router = express.Router()

// import controllers
import authController from '../../controllers/user/authController.js'

router.get('/login', authController.getLogin) // login page
router.post('/login', authController.postLogin) // check login credentials
router.get('/forget-password', authController.getForgetPassword) // get forget password page
router.post('/forget-password', authController.postForgetPassword) // post forger password
router.get('/change-password', authController.getChangePassword) // get change password page
router.post('/change-password', authController.postChangePassword) // post change password

router.get('/register', authController.getRegister) // register page
router.post('/register', authController.postRegister) // register user

router.get('/otp-verify', authController.getOtpVerify) // otp verify page
router.post('/otp-verify', authController.postOtpVerify) // otp validation
router.get('/resend-otp', authController.getResendOtp) // get resend otp

// Google login route
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

// Google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => {
    res.redirect('/') // Redirect to home on success
  },
)

// export router
export default router
