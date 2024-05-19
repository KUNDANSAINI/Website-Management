const mongoose=require('mongoose')



const serviceSchema=mongoose.Schema({
    img:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    decs:{
        type:String,
        required:true
    },
    mdetails:{
        type:String,
        required:true
    },
    postedDate:{
        type:Date,
        default:new Date()
    },
    status:{
        type:String,
        default:'Unpublished'
    }
})



module.exports=mongoose.model('service',serviceSchema)