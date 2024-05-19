const bannerTable=require('../models/banner')
let error=''
let color=''


exports.bannershow=async(req,res)=>{
    const userlogin=req.session.username
    const data= await bannerTable.findOne()
    //console.log(data)
    res.render('admin/banner.ejs',{userlogin,data,error,color})
}

exports.bannerupdateshow=async(req,res)=>{
    //console.log(req.params.id)
    const userlogin=req.session.username
    const data=await bannerTable.findById(req.params.id)
    //console.log(data)
    res.render('admin/bannerform.ejs',{userlogin,data,error,color})
}
exports.bannerupdate=async(req,res)=>{
    //console.log(req.file)
    const {btitle,bdecs,bmdetails}=req.body
    const id=req.params.id
    const userlogin=req.session.username
    var data=await bannerTable.findById(req.params.id)
    //console.log(btitle.length)
    if(btitle==''){
    error='Please Fill Banner Title'
    color='danger'
    }
    else if(btitle.length>35){
    error='Length Of Banner Title Should Be Less Then 35'
    color='danger'
    }
    else if(bdecs==''){
    error='Please Fill Banner Decprection'
    color='danger'
    }
    else if(bdecs.length>200){
        error='Length Of Banner Decripation Should Be Less Then 200'
        color='danger'
        }
    else if(bmdetails==''){
    error='Please Fill More Details'
    color='danger'
    }
    else if(req.file){
        const filename=req.file.filename
        await bannerTable.findByIdAndUpdate(id,({title:btitle,decs:bdecs,moredes:bmdetails,img:filename}))
    }
    else{
    await bannerTable.findByIdAndUpdate(id,({title:btitle,decs:bdecs,moredes:bmdetails}))
    error='Successfully Update'
    color='success'
    }
    res.render('admin/bannerform.ejs',{error,userlogin,data,color})
}


exports.moredetails=async(req,res)=>{
    const bandata=await bannerTable.findOne()
    res.render('moredeatails.ejs',{bandata})
}