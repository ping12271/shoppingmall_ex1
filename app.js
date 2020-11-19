const express = require('express')// express 라이브러리를 불러온다.
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')


//DB연결
const dbAdress = "mongodb+srv://ping12271:Ghdghd11@cluster0.tqgbb.mongodb.net/shoppingmall?retryWrites=true&w=majority"
const dboptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose
    .connect(dbAdress, dboptions)
    .then(() => console.log('mongodb connected...'))
    .catch(err => console.log('::::::::::::', err))

//미들웨어설정
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use('/product', productRoute)
app.use('/order', orderRoute)

const port = 8000

app.listen(port, console.log('sever startes'))
