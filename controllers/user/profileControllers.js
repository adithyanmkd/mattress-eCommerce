import User from '../../models/userModel.js'

// get user details page
const userDetails = (req, res) => {
  const user = req.session.user
  res.render('user/pages/profile/UserDetails', { user })
}

// get edit profile page
const getEditProfile = (req, res) => {
  const user = req.session.user
  res.render('user/pages/profile/EditPage', { user })
}

// post edit profile page
const postEditProfile = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, number, gender } = req.body

    const user = await User.find({ email })

    if (user.email) {
      return res.status(404).json({ error: 'User already exists!' })
    }

    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        number,
        gender,
      },
      { new: true }, // Return the updated document
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Update session if needed
    req.session.user = updatedUser

    // Redirect to the profile details page
    res.redirect('/account/my-details')
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// address page
const getAddress = (req, res) => {
  res.render('user/pages/profile/Address')
}

// export profile controller
const profileController = {
  userDetails,
  getEditProfile,
  postEditProfile,
  getAddress,
}
export default profileController
