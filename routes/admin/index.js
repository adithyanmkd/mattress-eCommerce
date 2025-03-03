import express from 'express'

const router = express.Router()

// import routes
import authRoutes from './authRoutes.js'
import dashboardRoutes from './dashboardRoutes.js'
import customerRoutes from './customerRoutes.js'
import productRoutes from './productRoutes.js'

router.use('/login', authRoutes) // auth routes
router.use('/', dashboardRoutes) // dashboard routes
router.use('/customers', customerRoutes) // customer controll routes
router.use('/product', productRoutes) // product routes

// export router
export default router
