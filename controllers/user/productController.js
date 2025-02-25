//importing sample dataset
import products from '../../sampleDatasets/productData.js'

const mattress = (req, res) => {
  res.render('user/pages/Mattress', { products })
}

// export product controller
export default { mattress }
