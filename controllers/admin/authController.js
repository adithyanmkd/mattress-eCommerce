//get login
const getLogin = (req, res) => {
  res.render('admin/pages/auth/Login', {
    layout: 'layouts/admin-auth-layout',
    title: 'admin login',
  })
}

//post admin login
const authenticateAdmin = (req, res) => {
  const { username, password } = req.body

  if (
    username == process.env.ADMIN_NAME &&
    password == process.env.ADMIN_PASS
  ) {
    // res.redirect('/admin')
    res.status(200).json({ success: true })
  } else {
    // res.render('admin/pages/auth/Login', {
    //   layout: 'layouts/admin-auth-layout',
    //   title: 'login',
    //   error: 'invalid credentials',
    // })
    res.status(401).json({ message: 'Invalid credentials' })
  }
}

export default {
  getLogin,
  authenticateAdmin,
}
