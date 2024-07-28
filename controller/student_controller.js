const studentmodel = require("../models/student_model")
const student_model = require("../models/student_model")

exports.register_student = async(req,res)=>{
    try {
        let {fullname,college_id,email,Department,class1,recent_marks,password,gender}=req.body

        studentmodel.create({fullname,college_id,email,Department,class1,recent_marks,password,gender})
        res.render('../views/mainpage/student/success')
        // console.log(data)
        // console.log(true)
        // console.log()
    } catch (error) {
        res.render('../views/mainpage/student/500')
    }
}
exports.login_student = async(req,res)=>{
    try {
        let data=req.body
        let user = await studentmodel.findOne({email:data.username, password:data.password})
        if (!user){
            // render new register page for new user
            // res.render('../views/mainpage/student/student_register')
            res.send("wrong user")
        }else{
            let total = await student_model.find()
            //render admin dashboard page
            // let uname = total.findOne({fullname:data.fullname})
            res.render('../views/mainpage/student/student_dashboard',{total,user})
        }

        console.log(user)
        
    } catch (error) {
        res.render('../views/mainpage/student/500.ejs')
    }
}

