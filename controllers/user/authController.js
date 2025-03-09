import bcrypt from 'bcrypt'
import validator from 'validator'

//import model
import { User } from '../../models/index.js'
import { generateOTP, sendOTP } from '../../utils/otpHelper.js'

//get login
const getLogin = (req, res) => {
  res.render('user/pages/auth/Login', {
    layout: 'layouts/auth-layout.ejs',
    title: 'login',
    success: req.flash('success')[0],
    error: req.flash('error')[0],
  })
}

// check login credentials
const postLogin = async (req, res) => {
  const { email, password } = req.body

  if (!validator.isEmail(email) || /[#$/%^&*]/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format!' })
  }

  try {
    const user = await User.findOne({ email }) // fetch user

    // if not user redirecting into login with message
    if (!user) {
      // return res.render('user/pages/auth/Login', {
      //   layout: 'layouts/auth-layout',
      //   title: 'login',
      //   error: 'User not found',
      //   email,
      // })
      return res.status(404).json({ error: 'User not found.' })
    }

    // if user is a google user
    if (user.isGoogleUser) {
      // return res.render('user/pages/auth/Login', {
      //   layout: 'layouts/auth-layout',
      //   title: 'login',
      //   error: 'You signed up with Google. Please log in using Google Sign-In.',
      // })
      return res.status(403).json({
        error: 'You signed up with Google. Please log in using Google Sign-In.',
      })
    }

    // if user blocked by admin
    if (user.isBlocked) {
      // return res.render('user/pages/auth/Login', {
      //   layout: 'layouts/auth-layout',
      //   title: 'login',
      //   error: 'Your account is currently blocked',
      // })
      return res
        .status(403)
        .json({ error: 'Your account is currently blocked.' })
    }

    //compare form password and database password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      // return res.render('user/pages/auth/Login', {
      //   layout: 'layouts/auth-layout',
      //   title: 'login',
      //   error: 'Invalid password',
      //   email,
      // })
      res.status(401).json({ error: 'Invalid password.' })
    }

    res.json({ success: true, message: 'Login successful' })
  } catch (error) {
    res.json({ Error: error, DeveloperError: 'post login error' })
  }
}

//get register
const getRegister = (req, res) => {
  res.render('user/pages/auth/Register', {
    layout: 'layouts/auth-layout.ejs',
    title: 'register',
    error: req.flash('error')[0],
    success: req.flash('success')[0],
  })
}

// register new user
const postRegister = async (req, res) => {
  const { fullname, email, password } = req.body // accessing values from form
  console.log(req.body)

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10)

  // generate OTP
  const otp = generateOTP()
  const otpExpiry = Date.now() + 10 * 60 * 100 // OTP expires in 10 minutes

  // check is the user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists!' })
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
    // res.redirect('/auth/otp-verify')
    res.status(200).json({ success: true })
  } catch (error) {
    res.json({ Error: error })
  }
}

// otp verify page
const getOtpVerify = (req, res) => {
  res.render('user/pages/auth/otpVerify', {
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

  console.log(`database otp ${user.otp}`)
  try {
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      // req.flash('error', 'Invalid or expired OTP')
      // return res.redirect('/auth/otp-verify')

      return res.status(400).json({ error: 'Invalid or expired OTP' })
    }

    // clear OTP field after verification
    user.otp = null
    user.otpExpires = null
    user.isVerified = true

    await user.save() // saving user

    if (req.session.isChangingPassword) {
      return res.redirect('/auth/change-password')
    } else {
      req.flash('success', 'OTP verified! You can now log in.')
      res.status(200).json({ success: true })
    }
  } catch (error) {
    res.json({
      Error: error,
      DeveloperNote: 'Error from post otp verify controller',
    })
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
    res.redirect('/auth/otp-verify')
  } catch (error) {
    res.json({ Error: error })
  }
}

// get forget password
const getForgetPassword = (req, res) => {
  res.render('user/pages/auth/forgetPassword', {
    layout: 'layouts/auth-layout.ejs',
    title: 'login',
    error: req.flash('error')[0],
  })
}

// get change password
const getChangePassword = (req, res) => {
  res.render('user/pages/auth/ChangePassword', {
    layout: 'layouts/auth-layout.ejs',
    title: 'login',
  })
}

// post change password
const postChangePassword = async (req, res) => {
  const email = req.session.tempEmail
  const { confirmPassword } = req.body

  try {
    const hashedPassword = await bcrypt.hash(confirmPassword, 10) // password hashing

    const user = await User.findOne({ email })
    user.password = hashedPassword
    await user.save()

    req.flash('success', 'password changed successfully!')
    res.redirect('/auth/login')
  } catch (error) {
    res.json({
      Error: error,
      DeveloperNote: 'error from post change password controller',
    })
  }
}

// email submission form for forget password
const postForgetPassword = async (req, res) => {
  const { email } = req.body

  // generate OTP
  const otp = generateOTP()
  const otpExpiry = Date.now() + 10 * 60 * 100 // OTP expires in 10 minutes

  try {
    const user = await User.findOne({ email }) // finding user

    // checking user is exist
    if (!user) {
      req.flash('error', 'User not found')
      return res.redirect('/auth/forget-password')
    }

    user.otp = otp
    user.otpExpires = otpExpiry
    await user.save()

    await sendOTP(email, otp) // send OTP to mail
    req.session.tempEmail = email
    req.session.isChangingPassword = true

    res.redirect('/auth/otp-verify')
  } catch (error) {
    res.json({
      Error: error,
      DeveloperNote: 'error from post forget password controller',
    })
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
  getForgetPassword,
  postForgetPassword,
  getChangePassword,
  postChangePassword,
}

//export controllers
export default authController
