const mongoose = require('mongoose')

const studentschema = new mongoose.Schema({
    fullname : {type:String , required:true},
    college_id : {type:Number , required:true},
    email : {type:String , required:true},
    Department : {type:String , required:true},
    class1 : {type:String , required:true},
    recent_marks : {type:Number , default:0 },
    password : {type:String , required:true},
    gender : {type:String , required:true}
},{timestamps:true})

module.exports=mongoose.model('student',studentschema)