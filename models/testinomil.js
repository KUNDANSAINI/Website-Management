const mongoose = require('mongoose')


const testiSchema = mongoose.Schema({
    img: {
        type: String,
    },
    decs: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        default: new Date()
    },
    status:{
        type:String,
        default:'Unpublished'
    }
})


module.exports = mongoose.model('testi', testiSchema)