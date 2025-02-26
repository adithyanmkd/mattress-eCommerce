//get login
const getLogin = (req, res) => {
  res.render('admin/pages/Login', {
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
    res.render('admin/pages/Dashboard', {
      layout: 'layouts/auth-layout',
      title: 'post login',
    })
  } else {
    res.render('admin/pages/Login', {
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
