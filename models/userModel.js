import mongoose, { mongo } from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    urique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'admin'], // Allowed roles
    default: 'customer', // Default role for new customer
  },
})

const User = mongoose.model('User', userSchema)

// export User model
export default User
