//get dashboard
const getDashboard = (req, res) => {
  res.render('admin/pages/Dashboard', {
    layout: 'layouts/auth-layout',
    title: 'login',
  })
}

//export controllers
export default {
  getDashboard,
}
