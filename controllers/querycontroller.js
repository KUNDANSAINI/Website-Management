const queryTable=require('../models/query')
const nodemailer=require('nodemailer')



exports.queryform=(req,res)=>{
    const {email,query}=req.body
    const queryRecord=new queryTable({email:email,query:query})
    queryRecord.save()
    res.render('querymessage.ejs')
}

exports.query=async(req,res)=>{
    const message=req.params.message
    const userlogin=req.session.username
    const querydata=await queryTable.find()
   // console.log(querydata)
   let error=''
    res.render('admin/query.ejs',{userlogin,querydata,error,message})
}

exports.delete=async(req,res)=>{
    const id=req.params.id
    await queryTable.findByIdAndDelete(id)
    let error='Successfully Delete'
    res.redirect(`/admin/query/${error}`)
}

exports.reply=async(req,res)=>{
    const userlogin=req.session.username
    const id=req.params.id
    const data=await queryTable.findById(id)
   // console.log(data)
    res.render('admin/replyform.ejs',{userlogin,data})
}

exports.sendemail=async(req,res)=>{
    const {emailto,emailfrom,fsubject,fbody}=req.body

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "boyfake051@gmail.com",
          pass: "tdzd nbbz zzkx kxwa",
        },
      });
     // console.log('Smtp Server Is Connect')
      if(req.file){
        const filepath=req.file.path
      await transporter.sendMail({
        from: "boyfake051@gmail.com", // sender address
        to: emailto, // list of receivers
        subject: fsubject, // Subject line
        text: fbody, // plain text body
        attachments:[{
          path:filepath
        }]
        //html: "<b>Hello world?</b>", // html body
      });
    }else{
      await transporter.sendMail({
        from: "boyfake051@gmail.com", // sender address
        to: emailto, // list of receivers
        subject: fsubject, // Subject line
        text: fbody, // plain text body
        //html: "<b>Hello world?</b>", // html body
      });
    }
      const id=req.params.id
      await queryTable.findByIdAndUpdate(id,{status:'Replied'})
     // console.log('Successfully Email Send')
     let error='Reply Has Been Successfully Sent'
     res.redirect(`/admin/query/${error}`)
}