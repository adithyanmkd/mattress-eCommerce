import Product from '../../models/productModel.js'

// get product add page
const getProduct = (req, res) => {
  res.render('admin/pages/AddProduct', {
    layout: 'layouts/admin-layout',
  })
}

// add product
const postProduct = async (req, res) => {
  try {
    console.log('Files:', req.files) // Debug uploaded files
    const { productName, description, price, category } = req.body // accessing form values
    console.log(req.body)

    // create new product
    const newProduct = new Product({
      productName,
      images: {
        cardImage: {
          path: req.files['cardImage'][0].path,
          alt: `${productName} card image`,
        },
        productImages: req.files['productImages'].map((file) => ({
          path: file.path,
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
    })

    await newProduct.save() // save new product
    res.redirect('/admin/')
  } catch (error) {
    res.json({ Error: error, DeveloperNote: 'post product controller' })
  }
}

const productController = {
  getProduct,
  postProduct,
}

// export product controller
export default productController
