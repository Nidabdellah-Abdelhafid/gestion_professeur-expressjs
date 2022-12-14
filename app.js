const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
const fileUpload = require("express-fileupload")
const port = process.env.PORT || 3000 


const mysql = require('mysql')

const bodyParser = require('body-parser')

const cors = require('cors')
require('dotenv').config();

const cookieParser=require('cookie-parser')
const session= require('express-session')
const flash= require('connect-flash')


app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(cookieParser('secret'))

app.use(session({
    secret:'secret',
    cookie:{maxAge:800000000},
    resave:true,
    saveUninitialized:false
}))

app.use(flash())


app.use(fileUpload())


app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.use('/css1', express.static(__dirname + 'public/css1'))
app.use('/js1', express.static(__dirname + 'public/js1'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/fonts', express.static(__dirname + 'public/fonts/icomoon'))
app.use('/scss', express.static(__dirname + 'public/scss'))

app.use(express.static('assets'))
app.use('/cssd', express.static(__dirname + 'assets/cssd'))
app.use('/jsd', express.static(__dirname + 'assets/jsd'))
app.use('/imagesd', express.static(__dirname + 'assets/imagesd'))
app.use('/fontsd', express.static(__dirname + 'assets/fontsd'))
app.use('/plunginsd', express.static(__dirname + 'assets/plunginsd'))


app.use(express.static('controllers'))
app.use('/upload', express.static(__dirname + 'controllers/upload'))


app.set('view engine', 'ejs')

const routes = require('./routes/routes');
app.use('', routes)


app.listen(port, () => console.log(`server running on http: //localhost:${port}`))