const express =require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const connectDB =require('./server/database/connection')

const app = express()

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log
app.use(morgan('tiny'))

// mongoDB connection
connectDB()

//parse
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set('view engine',"ejs")
// app.set('views',path.resolve(__dirname,'vires/ejs'))

//load
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/routes'))

app.listen(PORT,()=>{console.log(`Sercver is running on http://locahost:${PORT}`)})



