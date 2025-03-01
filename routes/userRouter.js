import express from 'express'

//import configs
import passport from '../config/passport.js'

//import controllers
import authController from '../controllers/user/authController.js'
import homeController from '../controllers/user/homeController.js'
import productController from '../controllers/user/productController.js'

//import middlewares
import navLinks from '../middlewares/user/navlinks.js'

//user router created
const userRouter = express.Router()

//middlwares
userRouter.use(navLinks)

userRouter.get('/login', authController.getLogin) // login page
userRouter.post('/login', authController.postLogin) // check login credentials

userRouter.get('/register', authController.getRegister) // register page
userRouter.post('/register', authController.postRegister) // register user

userRouter.get('/otp-verify', authController.getOtpVerify) // otp verify page
userRouter.post('/otp-verify', authController.postOtpVerify) // otp validation
userRouter.get('/resend-otp', authController.getResendOtp) // get resend otp

userRouter.get('/', homeController.getIndex) //home page

userRouter.get('/mattress', productController.mattress) // mattress page
userRouter.get('/pillows', productController.pillows) // pillows page

// Google login route
userRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)

// Google callback route
userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/') // Redirect to home on success
  },
)

//exporting user route
export default userRouter
