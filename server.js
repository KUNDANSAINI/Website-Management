const express=require('express')  //function format
const app=express()  //module format
app.use(express.urlencoded({extended:false}))
const session=require('express-session')
const userRouter=require('./routers/userrouter')
const adminRouter=require('./routers/adminrouter')
require('dotenv').config()
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/1300k')





app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false
}))
app.use(userRouter)
app.use('/admin',adminRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT,()=>{console.log(`server is running on port ${process.env.PORT}`)})
