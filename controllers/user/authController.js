import bcrypt from 'bcrypt'

//import model
import { User } from '../../models/index.js'
import { generateOTP, sendOTP } from '../../utils/otpHelper.js'

//get login
const getLogin = (req, res) => {
  res.render('user/pages/Login', {
    layout: 'layouts/auth-layout.ejs',
    title: 'login',
    success: req.flash('success')[0],
    error: req.flash('error')[0],
  })
}

// check login credentials
const postLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email }) // fetch user

    // if not user redirecting into login with message
    if (!user) {
      return res.render('user/pages/Login', {
        layout: 'layouts/auth-layout',
        title: 'login',
        error: 'User not found',
        email,
      })
    }

    //compare form password and database password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.render('user/pages/Login', {
        layout: 'layouts/auth-layout',
        title: 'login',
        error: 'Invalid password',
        email,
      })
    }

    res.redirect('/')
  } catch (error) {
    res.json({ Error: error })
  }
}

//get register
const getRegister = (req, res) => {
  res.render('user/pages/Register', {
    layout: 'layouts/auth-layout.ejs',
    title: 'register',
    error: req.flash('error')[0],
    success: req.flash('success')[0],
  })
}

// register new user
const postRegister = async (req, res) => {
  const { fullname, email, password } = req.body // accessing values from form

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10)

  // generate OTP
  const otp = generateOTP()
  const otpExpiry = Date.now() + 10 * 60 * 100 // OTP expires in 10 minutes

  // check is the user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    req.flash('error', 'User already exists')
    return res.redirect('/login')
  }

  try {
    //creating user
    const newUser = new User({
      name: fullname,
      email,
      otp,
      otpExpires: otpExpiry,
      password: hashedPassword,
    })

    await newUser.save() // save new user
    await sendOTP(email, otp) // send OTP to mail
    req.session.tempEmail = email
    res.redirect('/otp-verify')
  } catch (error) {
    res.json({ Error: error })
  }
}

// otp verify page
const getOtpVerify = (req, res) => {
  res.render('user/pages/otpVerify', {
    layout: 'layouts/auth-layout',
    title: 'verify otp',
    email: req.session.tempEmail,
    error: req.flash('error')[0],
    success: req.flash('success')[0],
  })
}

// otp validation
const postOtpVerify = async (req, res) => {
  const { email, otp } = req.body // accessing form email and otp
  const user = await User.findOne({ email }) // finding user from database

  try {
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      req.flash('error', 'Invalid or expired OTP')
      console.log(`database otp ${user.otp}`)
      return res.redirect('/otp-verify')
    }

    // clear OTP field after verification
    user.otp = null
    user.otpExpires = null
    user.isVerified = true

    await user.save()

    req.flash('success', 'OTP verified! You can now log in.')
    res.redirect('/login')
  } catch (error) {
    res.json({ Error: error })
  }
}

//resend otp
const getResendOtp = async (req, res) => {
  // generate OTP
  const otp = generateOTP()
  const otpExpiry = Date.now() + 10 * 60 * 100 // OTP expires in 10 minutes

  try {
    const user = await User.findOneAndUpdate(
      { email: req.session.tempEmail }, // Find user by email
      { otp, otpExpires: otpExpiry }, // Update fields
      { new: true }, // Return updated document
    )

    if (!user) {
      req.flash('error', 'User not exist')
      return res.redirect('/otp-verify')
    }

    await sendOTP(user.email, otp) // resending OTP to mail
    req.flash('success', 'OTP has been sent successfully!')
    res.redirect('/otp-verify')
  } catch (error) {
    res.json({ Error: error })
  }
}

// controllers object
const authController = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  getOtpVerify,
  postOtpVerify,
  getResendOtp,
}

//export controllers
export default authController
