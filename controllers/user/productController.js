//importing sample dataset
import products from '../../datasets/productData.js'

const mattress = (req, res) => {
  res.render('user/pages/Mattress', { products })
}

const pillows = (req, res) => {
  res.render('user/pages/Pillows')
}

// export product controller
export default { mattress, pillows }
