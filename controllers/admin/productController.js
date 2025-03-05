// import models
import Category from '../../models/catagoryModel.js'
import Product from '../../models/productModel.js'

// get add product page
const getProduct = async (req, res) => {
  const categories = await Category.find()
  res.render('admin/pages/products/AddProduct', {
    layout: 'layouts/admin-layout',
    categories,
  })
}

// add product
const postProduct = async (req, res) => {
  try {
    const { productName, description, price, category, quantity } = req.body // accessing form values
    const discount = parseFloat(price.discount)
    price.discount = isNaN(discount) ? 0 : discount

    // create new product
    const newProduct = new Product({
      productName,
      images: {
        cardImage: {
          path: req.files['cardImage'][0].path.replace(/.*\/public\//, '/'), // Keep only relative path
          alt: `${productName} card image`,
        },
        productImages: req.files['productImages'].map((file) => ({
          path: file.path.replace(/.*\/public\//, '/'), // Keep only relative path
          alt: `${productName} product image`,
        })),
      },
      description: description,
      price: {
        sellingPrice: parseFloat(price.sellingPrice),
        originalPrice: parseFloat(price.originalPrice),
        discount: parseFloat(price.discount),
      },
      category,
      quantity,
    })

    await newProduct.save() // save new product
    res.redirect('/admin/products')
  } catch (error) {
    res.json({ Error: error, DeveloperNote: 'post product controller' })
  }
}

// list all products
const allProduct = async (req, res) => {
  let searchValue = req.query.search || '' // accessing search value from url

  const page = parseInt(req.query.page) || 1
  const limit = 1 // Number of users per page
  const skip = (page - 1) * limit

  // Build the search filter
  let filter = {}
  if (searchValue) {
    filter = {
      $or: [{ productName: { $regex: searchValue, $options: 'i' } }],
    }
  }

  // Count total matching users
  const totalProducts = await Product.countDocuments()
  const totalPages = Math.ceil(totalProducts / limit)

  // Fetch filtered and paginated product
  const products = await Product.find({ ...filter, isDeleted: false })
    .skip(skip)
    .limit(limit)

  res.render('admin/pages/products/ListProduct', {
    products,
    page,
    totalPages,
    layout: 'layouts/admin-layout',
  })
}

// delete product
const deleteProduct = async (req, res) => {
  const id = req.params.id
  try {
    const product = await Product.findById(id)
    product.isDeleted = true
    await product.save()
    res.redirect('/admin/products')
  } catch (error) {
    res.json({
      Error: error,
      DeveloperNote: 'error from delete product controller',
    })
  }
}

const productController = {
  getProduct,
  postProduct,
  allProduct,
  deleteProduct,
}

// export product controller
export default productController
