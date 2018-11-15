const express = require('express')
const check = require('./router/check')
const mongoose = require('mongoose')

const bodyParser = require("body-parser")

//这一句是链接上数据库
var db = mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true},function(err){
    if(err){
        console.log('Connection Error:' + err)
    }
})
//test 就是数据库的名字，不是表的名字

const  app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/api',check)
app.listen(3000,() => {
    console.info('app listening on port 3000')
})
