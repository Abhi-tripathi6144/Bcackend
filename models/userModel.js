const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    full_name : {type:String},
    email : {type:String, unique:true, required:true},
    mobile_number:{type:String, unique:true, required:true},
    password : {type:String},
    aadhar_number:{type:Number, unique:true},
    aadhar_kyc_status : {type:Boolean, default:false},
    address : {
        adress_line_1:{type:String},
        adress_line_2:{type:String},
        area:{type:String},
        city:{type:String},
        state:{type:String},
        pincode:{type:Number},
        nation:{type:String, default:"Baharat"}
    },
    isActive:{type:String, enum:["Active","InActive","Nuteral"]},
},{timestamps:true}
)

module.exports = mongoose.model("user",userSchema);