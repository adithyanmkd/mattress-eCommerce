import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  image: {
    type: String,
    default:
      '/images/products/card-images/week-8/public/images/products/card-images/1741063678153-hybrid-mattress-1.webp',
  },
})

const Category = mongoose.model('Category', categorySchema)

// export model
export default Category
