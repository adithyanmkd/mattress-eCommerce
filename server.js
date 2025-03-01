import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import expressLayouts from 'express-ejs-layouts'
import session from 'express-session'
import flash from 'connect-flash'
import MongoStore from 'connect-mongo'

// import configs
import passport from './config/passport.js'

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

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions', // Collection name in MongoDB
      ttl: 24 * 60 * 60, // Session expires in 24 hours
    }),
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true, // Prevents client-side JavaScript from accessing the session cookie
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiry in 24 hours
    },
  }),
)

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

app.use(flash()) // flash message i used to succes, and error message showing

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
