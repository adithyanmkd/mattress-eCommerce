import express from 'express'

const router = express.Router()

// import controller
import dashboardController from '../../controllers/admin/dashboardController.js'

// import middlewares
import adminSidebar from '../../middlewares/admin/adminSidebar.js'

// adding app level middleware
router.use(adminSidebar)

router.get('/', dashboardController.getDashboard) // get dashboard

// export router
export default router
