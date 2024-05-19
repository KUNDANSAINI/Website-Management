const testiTable=require('../models/testinomil')



exports.feedbackformshow=(req,res)=>{
    res.render('feedbackform.ejs')
}

exports.feedbackform=(req,res)=>{
    const {fdecs,user}=req.body
    if(req.file){
        const filename=req.file.filename
        const newrec=new testiTable({decs:fdecs,user:user,img:filename})
        newrec.save()
        res.redirect('/')
    }else{
    const newrec=new testiTable({decs:fdecs,user:user})
    newrec.save()
    res.redirect('/')
    }
}

exports.feedback=async(req,res)=>{
    const message=req.params.message
    const userlogin=req.session.username
    if(req.params.message=='ace'){
    var testidata=await testiTable.find().sort({postedDate:1})
    }
    else if(req.params.message=='dec'){
    var testidata=await testiTable.find().sort({postedDate:-1})
    }else{
    var testidata=await testiTable.find()
    }
    const testicount=await testiTable.find().count()
    const Publishedtesti=await testiTable.find({status:'Published'}).count()
    const Unpublishedtesti=await testiTable.find({status:'Unpublished'}).count()
   // console.log(Unpublishedtesti)
   let mess=''
    res.render('admin/feedback.ejs',{userlogin,testidata,mess,message,testicount,Publishedtesti,Unpublishedtesti})
}

exports.delete=async(req,res)=>{
    const id=req.params.id
    await testiTable.findByIdAndDelete(id)
    let mess='Successfully Delete'
    res.redirect(`/admin/testinomils/${mess}`)
}

exports.feedbackupdate=async(req,res)=>{
    const id=req.params.id
    const datastatus=await testiTable.findByIdAndUpdate(id,{status:'Unpublished'})
    //console.log(datastatus)
    let newstatus=null

    if(datastatus.status=='Unpublished'){
        newstatus='Published'
    }else{
        newstatus='Unpublished'
    }
    await testiTable.findByIdAndUpdate(id,{status:newstatus})
    res.redirect('/admin/testinomils/message')
}