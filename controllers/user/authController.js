//get login
const getLogin = (req, res) => {
  res.render('user/pages/Login', {
    layout: 'layouts/auth-layout.ejs',
    title: 'login',
  })
}

const getRegister = (req, res) => {
  res.render('user/pages/Register', {
    layout: 'layouts/auth-layout.ejs',
    title: 'register',
  })
}

const postRegister = (req, res) => {
  res.json(req.body)
}

//export controllers
export default {
  getLogin,
  getRegister,
  postRegister,
}
