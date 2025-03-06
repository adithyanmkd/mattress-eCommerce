import express from 'express'

//import controllers
import authController from '../controllers/user/authController.js'
import homeController from '../controllers/user/homeController.js'
import productController from '../controllers/user/productController.js'

//user router created
const userRouter = express.Router()

userRouter.get('/mattress', productController.mattress) // mattress page
userRouter.get('/pillows', productController.pillows) // pillows page

//exporting user route
export default userRouter
