const serviceTable=require('../models/service')
let message=''
let color=''



exports.serviceShow=async(req,res)=>{
    const  message=req.params.mess
    const userlogin=req.session.username
    if(req.params.mess=='hit'){
     var sdata=await serviceTable.find().sort({postedDate:1})
    }
    else if(req.params.mess=='hit1'){
        var sdata=await serviceTable.find().sort({postedDate:-1})
    }else{
        var sdata=await serviceTable.find()
    }
    const totelService=await serviceTable.find().count()
    const Published=await serviceTable.find({status:'Published'}).count()
    const Unpublished=await serviceTable.find({status:'Unpublished'}).count()
    //console.log(sdata)
    res.render('admin/service.ejs',{userlogin,message,color,sdata,totelService,Published,Unpublished})
}

exports.serviceformshow=(req,res)=>{
    const userlogin=req.session.username
    res.render('admin/serviceform.ejs',{userlogin,message,color})
}

exports.serviceform=(req,res)=>{
    const {stitle,tdecs,smdetails}=req.body
    const userlogin=req.session.username
    if(stitle==''){
        message='Please Fill This Service Title'
        color='danger'
        res.redirect('/admin/serviceform')
    }
    else if(tdecs==''){
        message='Please Fill This Service Decripation'
        color='danger'
        res.redirect('/admin/serviceform')
    }
    else if(smdetails==''){
        message='Please Fill This Service Details'
        color='danger'
        res.redirect('/admin/serviceform')
    }
    else if(req.file){
        const filename=req.file.filename
        const newrecord=new serviceTable({title:stitle,decs:tdecs,mdetails:smdetails,img:filename})
        newrecord.save()
        message='Successfully Update'
        color='success'
        res.redirect(`/admin/service/${message}`)
    }
    else{
    const newrecord=new serviceTable({title:stitle,decs:tdecs,mdetails:smdetails})
    newrecord.save()
    message='Successfully Update'
    color='success'
   // res.render('admin/serviceform.ejs',{userlogin,message,color})
   res.redirect(`/admin/service/${message}`)
    }
}

exports.delete=async(req,res)=>{
    const id=req.params.id
    await serviceTable.findByIdAndDelete(id)
    message='successfully Deleted'
    res.redirect(`/admin/service/${message}`)
}

exports.statusupdate=async(req,res)=>{
    const id=req.params.id
    const data=await serviceTable.findById(id)
    let newstatus=null
    if(data.status=='Unpublished'){
        newstatus='Published'
    }else{
        newstatus='Unpublished'
    }
    await serviceTable.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/service/mess')
}

exports.servicemdetails=async(req,res)=>{
    const id=req.params.id
    const servicemore=await serviceTable.findById(id)
    res.render('servicemdetails.ejs',{servicemore})
}