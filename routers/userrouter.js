const router=require('express').Router()
const registerc=require('../controllers/registercontroller')
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicecontroller')
const testic=require('../controllers/testinomilcontroller')
const queryc=require('../controllers/querycontroller')


const bannerTable=require('../models/banner')
const serviceTable=require('../models/service')
const testiTable=require('../models/testinomil')

const multer=require('../helpers/multer')

router.get('/',async(req,res)=>{
    const bannerdata=await bannerTable.findOne()
    const servicedata=await serviceTable.find({status:'Published'})
    const testidata=await testiTable.find({status:'Published'})
   // console.log(testidata)
    res.render('index.ejs',{bannerdata,servicedata,testidata})
})
router.get('/moredetails',bannerc.moredetails)
router.get('/servicemdetails/:id',servicec.servicemdetails)
router.get('/testi',testic.feedbackformshow)
router.post('/testi',multer.single('img'),testic.feedbackform)
router.post('/queryform',queryc.queryform)



module.exports=router

