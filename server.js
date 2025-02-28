import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import flash from 'connect-flash'

import connectDB from './config/database.js' //imported db

//importing routes
import userRouter from './routes/userRouter.js'
import adminRouter from './routes/adminRouter.js'

const app = express()

//fix __dirname && __filename for module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//connet DB
connectDB()

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
)

app.use(flash())

app.use(express.urlencoded({ extended: true })) // Enables parsing of form data
app.use(express.json()) // Enables JSON parsing (for APIs)

// Use express-ejs-layouts
app.use(expressLayouts)

//set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.set('layout', 'layouts/user-layout')

//serve static files (images, js, CSS)
app.use(express.static(path.join(__dirname, 'public')))

//middlewares

//router
app.use('/', userRouter)
app.use('/admin', adminRouter)

//start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running on ${PORT}`))
