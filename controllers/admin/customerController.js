import User from '../../models/userModel.js' // user model imported

// get all customer
const getAllUser = async (req, res) => {
  const users = await User.find()
  res.render('admin/pages/AllUsers', {
    users,
    layout: 'layouts/admin-layout.ejs',
  })
}

// export all controller
const customerController = {
  getAllUser,
}
export default customerController
