import express from 'express'

//import controllers
import authController from '../controllers/admin/authController.js'
import dashboardController from '../controllers/admin/dashboardController.js'
import customerController from '../controllers/admin/customerController.js'

// import middlewares
import adminSidebar from '../middlewares/admin/adminSidebar.js'

const adminRouter = express.Router()

// adding app level middleware
adminRouter.use(adminSidebar)

adminRouter.get('/', dashboardController.getDashboard) // get dashboard

adminRouter.get('/login', authController.getLogin) // get login page
adminRouter.post('/login', authController.authenticateAdmin) // post login page

adminRouter.get('/customers', customerController.getAllUser) // get all users

export default adminRouter
