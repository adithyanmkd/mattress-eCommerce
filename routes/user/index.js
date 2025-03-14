import express from 'express'

const router = express.Router()

// import routes
import authRoutes from './authRoutes.js'
import homeRoutes from './homeRoutes.js'
import productRoutes from './productRoutes.js'
import profileRoutes from './profileRoutes.js'

//import middlew2ares
import navLinks from '../..//middlewares/user/userNavLinks.js'

router.use(navLinks) // middleware using

router.use('/', homeRoutes) // home page routes
router.use('/auth', authRoutes) // authentication routes
router.use('/products', productRoutes) // product routes
router.use('/account', profileRoutes) // profile routes

// export router
export default router
