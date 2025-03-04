//get login
const getLogin = (req, res) => {
  res.render('admin/pages/auth/Login', {
    layout: 'layouts/auth-layout',
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
    res.redirect('/admin')
  } else {
    res.render('admin/pages/auth/Login', {
      layout: 'layouts/auth-layout',
      title: 'login',
      error: 'invalid credentials',
    })
  }
}

export default {
  getLogin,
  authenticateAdmin,
}
