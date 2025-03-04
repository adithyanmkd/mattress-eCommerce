import express from 'express'

const router = express.Router()

// import controllers
import categoryController from '../../controllers/admin/categoryController.js'

router.get('/', categoryController.getCategoryList) // list all categories
router.get('/add', categoryController.getAddCategory) // add category

// export router
export default router
