import bcrypt from 'bcrypt'

//import model
import { User } from '../../models/index.js'

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
  })
}

const postRegister = async (req, res) => {
  const { fullname, email, password } = req.body // accessing values from form

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10)

  // check is the user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    req.flash('error', 'User already exists')
    return res.redirect('register')
  }

  try {
    //creating user
    const newUser = new User({
      name: fullname,
      email,
      password: hashedPassword,
    })

    await newUser.save() // save new user
    req.flash('success', 'User has been successfully created!')
    res.redirect('/login')
  } catch (error) {
    res.json({ Error: error })
  }
}

const authController = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
}

//export controllers
export default authController
