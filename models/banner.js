const mongoose=require('mongoose')


const bannerSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    decs:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    moredes:{
        type:String,
        required:true
    },
    postedDate:{
        type:Date,
        default: new Date()
    },
    
})


module.exports=mongoose.model('banner',bannerSchema)