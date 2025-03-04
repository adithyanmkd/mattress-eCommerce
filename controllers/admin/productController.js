import Product from '../../models/productModel.js'

// get product add page
const getProduct = (req, res) => {
  res.render('admin/pages/products/AddProduct', {
    layout: 'layouts/admin-layout',
  })
}

// add product
const postProduct = async (req, res) => {
  try {
    const { productName, description, price, category, quantity } = req.body // accessing form values

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
    res.redirect('/admin')
  } catch (error) {
    res.json({ Error: error, DeveloperNote: 'post product controller' })
  }
}

// list all products
const allProduct = async (req, res) => {
  const products = await Product.find({})
  res.render('admin/pages/products/ListProduct', {
    products,
    layout: 'layouts/admin-layout',
  })
}

const productController = {
  getProduct,
  postProduct,
  allProduct,
}

// export product controller
export default productController
