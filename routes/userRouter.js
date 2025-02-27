import express from 'express'

//import controllers
import authController from '../controllers/user/authController.js'
import productController from '../controllers/user/productController.js'

//import middlewares
import navLinks from '../middlewares/user/navlinks.js'
import homeController from '../controllers/user/homeController.js'

//user router created
const userRouter = express.Router()

//middlwares
userRouter.use(navLinks)

userRouter.get('/login', authController.getLogin) //login page
userRouter.get('/register', authController.getRegister) //register page
userRouter.post('/register', authController.postRegister) // register user
userRouter.get('/', homeController.getIndex) //home page
userRouter.get('/mattress', productController.mattress) //mattress page
userRouter.get('/pillows', productController.pillows) // pillows page

//exporting user route
export default userRouter
