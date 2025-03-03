import User from '../../models/userModel.js' // user model imported

// get all customer
const getAllUser = async (req, res) => {
  try {
    let users
    let searchValue = req.query.search || ''

    if (searchValue) {
      // get filterd users
      users = await User.find({
        $or: [
          { name: { $regex: searchValue, $options: 'i' } },
          { email: { $regex: searchValue, $options: 'i' } },
        ],
      })
    } else {
      users = await User.find() // get all users
    }

    res.render('admin/pages/AllUsers', {
      users,
      layout: 'layouts/admin-layout.ejs',
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.json({ Error: error, DeveloperNote: 'get all users route' })
  }
}

// get search based customer
const searchCustomer = async (req, res) => {
  const searchValue = req.query.search
  console.log(searchValue)
}

// block user
const toggleBlock = async (req, res) => {
  const userId = req.params.id
  const user = await User.findById({ _id: userId })

  try {
    user.isBlocked = !user.isBlocked // Toggle block status
    await user.save()
    res.redirect('/admin/customers')
  } catch (error) {
    res.json({ Error: error, DevloperNote: 'toggle block controller' })
  }
}

// export all controller
const customerController = {
  getAllUser,
  toggleBlock,
  searchCustomer,
}
export default customerController
