import User from '../../models/userModel.js' // user model imported

// get all customer
const getCustomers = async (req, res) => {
  try {
    let searchValue = req.query.search || ''

    const page = parseInt(req.query.page) || 1
    const limit = 1 // Number of users per page
    const skip = (page - 1) * limit

    // Build the search filter
    let filter = {}
    if (searchValue) {
      filter = {
        $or: [
          { name: { $regex: searchValue, $options: 'i' } },
          { email: { $regex: searchValue, $options: 'i' } },
        ],
      }
    }

    // Count total matching users
    const totalCustomers = await User.countDocuments(filter)
    const totalPages = Math.ceil(totalCustomers / limit)

    // Fetch filtered and paginated customers
    const users = await User.find(filter).skip(skip).limit(limit)

    res.render('admin/pages/customers/Customers', {
      users,
      page,
      totalPages,
      searchValue, // Keep search value in UI
      layout: 'layouts/admin-layout.ejs',
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    res.json({ Error: error, DeveloperNote: 'get all users route' })
  }
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
  getCustomers,
  toggleBlock,
}
export default customerController
