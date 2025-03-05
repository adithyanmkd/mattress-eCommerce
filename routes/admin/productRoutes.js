import express from 'express'

import upload from '../../config/multerConfig.js' // file saving util function imported

const router = express.Router()

// import controllers
import productController from '../../controllers/admin/productController.js'

// file upload
const uploadFields = upload.fields([
  { name: 'cardImage', maxCount: 1 },
  { name: 'productImages' },
])

router.get('/add', productController.getProduct) // get product add page
router.post('/add', uploadFields, productController.postProduct) // add product
router.get('/', productController.allProduct) // list all product
router.post('/:id/delete', productController.deleteProduct) // delete product

// export router
export default router
