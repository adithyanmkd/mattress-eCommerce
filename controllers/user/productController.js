//importing sample dataset
import Product from '../../models/productModel.js'

const mattress = async (req, res) => {
  const products = await Product.find()
  console.log(products)
  res.render('user/pages/products/Mattress', { products })
}

const pillows = (req, res) => {
  res.render('user/pages/Pillows')
}

// export product controller
export default { mattress, pillows }
