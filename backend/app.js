const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
var cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

//import Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const fileRoutes = require('./routes/file')

//app
const app = express()
app.use('/uploads', express.static('uploads'))

//db
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected'))

//middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


//routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', fileRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})