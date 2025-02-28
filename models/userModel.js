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
  isVerified: { type: Boolean, default: false }, // Account verification status
  otp: { type: String }, // OTP for email validation
  otpExpires: { type: Date }, // Expiration time for OTP
})

const User = mongoose.model('User', userSchema)

// export User model
export default User
