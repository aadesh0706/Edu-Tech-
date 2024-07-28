const adminmodel = require("../models/admin_model")
const student_model = require("../models/student_model")

exports.register_admin = async(req,res)=>{
    try {
        let {fullname,college_id,email,Department,password,cpassword,gender}=req.body
        // if (password != cpassword){
        //     res.send("Wrong Password")
        // }else{
        //     res.sendFile('success.html')
        // }
        adminmodel.create({fullname,college_id,email,Department,password,cpassword,gender})
        // res.sendFile('/success_register')
        res.render('../views/mainpage/admin/success')
        console.log(data)
    } catch (error) {
        
    }
}

exports.login_admin = async(req,res)=>{
    try {
        let data=req.body
        let user = await adminmodel.findOne({email:data.username, password:data.password})
        if (!user){
            // render new register page for new user
            res.send("wrong user")
        }else{
            let total = await student_model.find().sort({"recent_marks":-1})
            
            //render admin dashboard page
            res.render('../views/mainpage/admin/admin_dashboard',{total})
        }

        console.log(user)
        
    } catch (error) {
        res.render('../views/mainpage/student/500.ejs')
    }
}


//   fullname: 'Kunal',
//   college_id: '123',
//   email: 'a@gmail.com',
//   Department: 'Computer Engineering',
//   password: 'co',
//   cpassword: 'co',
//   gender: 'Female'