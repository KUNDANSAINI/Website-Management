const mongoose=require('mongoose')

const querySchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    query:{
        type:String,
        required:true
    },
    postedDate:{
        type:Date,
        default:new Date(),
        required:true
    },
    status:{
        type:String,
        default:'Reply',
        required:true
    }
})

module.exports=mongoose.model('query',querySchema)