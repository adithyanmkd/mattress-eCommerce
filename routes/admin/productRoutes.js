import express from 'express'

import upload from '../../config/multerConfig.js' // file saving util function imported

const router = express.Router()

// import controllers
import productController from '../../controllers/admin/productController.js'

router.get('/add', productController.getProduct) // get product add page
router.post(
  '/add',
  upload.fields([
    { name: 'cardImage', maxCount: 1 },
    { name: 'productImages', maxCount: 4 },
  ]),
  productController.postProduct,
) // add product

// export router
export default router
