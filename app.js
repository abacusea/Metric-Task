const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
require('dotenv').config()

//import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

//app
const app = express()

//db
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected'))

//middlewares
app.use(morgan('dev'))
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})