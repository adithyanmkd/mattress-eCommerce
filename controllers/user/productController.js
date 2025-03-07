import Product from '../../models/productModel.js'

const products = async (req, res) => {
  try {
    let { category, sort, page } = req.query
    let limit = 6 // Number of products per page
    let currentPage = parseInt(page) || 1
    let skip = (currentPage - 1) * limit

    // Filtering Logic
    let query = {}
    if (category && category !== 'all') {
      query.category = category // Apply category filter
    }

    // Sorting Logic
    let sortQuery = {}
    if (sort) {
      if (sort === 'priceLow') sortQuery['price.sellingPrice'] = 1 // Low to High
      if (sort === 'priceHigh') sortQuery['price.sellingPrice'] = -1 // High to Low
      if (sort === 'nameAsc') sortQuery['productName'] = 1 // A to Z
      if (sort === 'nameDesc') sortQuery['productName'] = -1 // Z to A
      if (sort === 'discountHigh') sortQuery['price.discount'] = -1 // Highest Discount
    }

    // Get Total Count of Products (After Filtering)
    let totalProducts = await Product.countDocuments(query)
    let totalPages = Math.ceil(totalProducts / limit)

    // Fetch Filtered & Sorted Products
    let products = await Product.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)

    // Render Products Page
    res.render('user/pages/products/Products', {
      products,
      category,
      sort,
      currentPage,
      totalPages,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).send('Internal Server Error')
  }
}

// Individual Category Pages (Optional)
const mattress = async (req, res) => {
  res.render('user/pages/products/Mattress')
}

const pillows = (req, res) => {
  res.render('user/pages/Pillows')
}

// Export Updated Product Controller
const productController = {
  mattress,
  pillows,
  products,
}

export default productController
