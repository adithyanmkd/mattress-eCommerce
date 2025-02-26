import express from 'express'

//import controllers
import authController from '../controllers/admin/authController.js'
import dashboardController from '../controllers/admin/dashboardController.js'

const adminRouter = express.Router()

adminRouter.get('/', dashboardController.getDashboard)
adminRouter.get('/login', authController.getLogin)
adminRouter.post('/login', authController.authenticateAdmin)

export default adminRouter
