import express from 'express'

//import controllers
import authController from '../controllers/user/authController.js'
import productController from '../controllers/user/productController.js'

//import middlewares
import navLinks from '../middlewares/user/navlinks.js'

//user router created
const userRouter = express.Router()

//middlwares
userRouter.use(navLinks)

userRouter.get('/', authController.index)
userRouter.get('/mattress', productController.mattress)
userRouter.get('/pillows', productController.pillows)

//exporting user route
export default userRouter
