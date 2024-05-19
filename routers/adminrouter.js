const router=require('express').Router()
const registerc=require('../controllers/registercontroller')
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicecontroller')
const testic=require('../controllers/testinomilcontroller')
const queryc=require('../controllers/querycontroller')



const handleadmin=require('../middlewere/handleadmin')
const multer=require('../helpers/multer')



router.get('/',registerc.loginshow)
router.post('/',registerc.login)
router.get('/dashbord',handleadmin,registerc.Dashbordshow)
router.get('/logout',registerc.logout)
router.get('/banner',handleadmin,bannerc.bannershow)
router.get('/bannerupdate/:id',handleadmin,bannerc.bannerupdateshow)
router.post('/bannerupdate/:id',multer.single('img'),bannerc.bannerupdate)
router.get('/service/:mess',handleadmin,servicec.serviceShow)
router.get('/serviceform',handleadmin,servicec.serviceformshow)
router.post('/serviceform',multer.single('img'),servicec.serviceform)
router.get('/delete/:id',servicec.delete)
router.get('/statusupdate/:id',servicec.statusupdate)
router.get('/testinomils/:message',handleadmin,testic.feedback)
router.get('/feedbackdelete/:id',testic.delete)
router.get('/feedbackupdate/:id',testic.feedbackupdate)
router.get('/query/:message',queryc.query)
router.get('/querydelete/:id',queryc.delete)
router.get('/queryreply/:id',queryc.reply)
router.post('/queryreply/:id',multer.single('attchment'),queryc.sendemail)


module.exports=router
