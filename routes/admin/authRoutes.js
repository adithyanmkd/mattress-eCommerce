import express from 'express'

//import controllers
import authController from '../../controllers/admin/authController.js'

const router = express.Router()

router.get('/', authController.getLogin) // get login page
router.post('/', authController.authenticateAdmin) // post login page

// export routes
export default router
