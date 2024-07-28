const mongoose = require('mongoose')

const teacherschema = new mongoose.Schema({
    fullname : {type:String , required:true},
    college_id : {type:Number , required:true},
    email : {type:String , required:true},
    department : {type:String , required:true},
    password : {type:String , required:true},
    cpassword : {type:String , required:true},
    gender : {type:String , required:true}
},{timestamps:true})

module.exports=mongoose.model('teacher',teacherschema)