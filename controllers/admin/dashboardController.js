//get dashboard
const getDashboard = (req, res) => {
  res.render('admin/pages/Dashboard', {
    layout: 'layouts/admin-layout.ejs',
  })
}

//export controllers
export default {
  getDashboard,
}
