import mongoose, { modelNames } from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    images: {
      cardImage: {
        path: { type: String, required: true },
        alt: { type: String, required: true },
      },
      productImages: [
        {
          path: { type: String, required: true },
          alt: { type: String, required: true },
        },
      ],
    },
    rating: { type: String },
    description: { type: String, required: true },
    price: {
      sellingPrice: { type: Number, required: true },
      originalPrice: { type: Number, required: true },
      discount: { type: Number },
    },
    quantity: { type: Number, required: true },
    wishlistStatus: { type: Boolean, default: false },
    category: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: 'Category',
      required: true,
    }, // Reference to Category model
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }, // adds createdAt & updatedAt
)

const Product = mongoose.model('Products', productSchema)

// export model
export default Product
