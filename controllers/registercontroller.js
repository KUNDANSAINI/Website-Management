const registerTable=require('../models/register')



exports.loginshow=(req,res)=>{
    let error=''
    res.render('admin/index.ejs',{error})
}
exports.login=async(req,res)=>{
    const {username,pass}=req.body
    if(username==''||pass==''){
        let error='Please Fill Username & Password'
        res.render('admin/index.ejs',{error})
    }else{
    const userche= await registerTable.findOne({username:username})
    if(userche!=null){
        if(userche.password==pass){
            req.session.isAuth=true
            req.session.username=username
            res.redirect('/admin/dashbord')
        }else{
            let error='Wrong Password'
            res.render('admin/index.ejs',{error})
        }
    }else{
        //res.send('username is not correct')
        let error='Wrong Username'
        res.render('admin/index.ejs',{error})
    }
}
}

exports.Dashbordshow=(req,res)=>{
    const userlogin=req.session.username
    res.render('admin/dashbord.ejs',{userlogin})
}

exports.logout=(req,res)=>{
    req.session.destroy()
    res.redirect('/admin')
}