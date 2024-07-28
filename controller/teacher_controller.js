const teachermodel = require("../models/teacher_model")
const jwt = require("jsonwebtoken")
const { request } = require("express")
const student_model = require("../models/student_model")
const teacher_model = require("../models/teacher_model")


exports.register_teacher = async(req,res)=>{
    try {
        let {fullname,college_id,email,department,password,cpassword,gender}=req.body

        teachermodel.create({fullname,college_id,email,department,password,cpassword,gender})
        res.render('../views/mainpage/teacher/success')
        console.log(data)
        
    } catch (error) {
        
    }
}
exports.login_teacher = async(req,res)=>{
    try {
        let data=req.body
        let user = await teachermodel.findOne({email:data.username, password:data.password})
        if (!user){
            // render new register page for new user
        }else{
            //render admin dashboard page
            let token = jwt.sign({email:user.email.toString()}, "Aadesh")
            res.cookie("jwt",token)        

            let total = await student_model.find({Department:user.department}).sort({"recent_marks":-1})
            // let total_stud = await student_model.find()
            console.log(total)
            res.render('../views/mainpage/teacher/teacher_dashboard', {total} )        
        }

        // console.log(user)
        
    } catch (error) {
        res.render('../views/mainpage/student/500.ejs')
    }
}

