const mongoose=require('mongoose')


const registerSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    postedDate:{
        type:Date,
        default: new Date()
    },
    status:{
        type:String,
        default:'Active'
    }
})



module.exports=mongoose.model('register',registerSchema)