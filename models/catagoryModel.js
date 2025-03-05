import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      path: {
        type: String,
        required: true,
        default:
          '/images/products/card-images/week-8/public/images/products/card-images/1741063678153-hybrid-mattress-1.webp',
      },
      alt: { type: String, default: 'category image' },
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }, // adds createdAt & updatedAt
)

const Category = mongoose.model('Category', categorySchema)

// export model
export default Category
