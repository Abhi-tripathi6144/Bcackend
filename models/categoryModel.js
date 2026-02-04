const mongoose = require('mongoose');
 const categorySchema = new mongoose.Schema({
    name: {type:String, unique:true, required: true},
    description: {type:String},
    parentCategory: {type: mongoose.Schema.Types.ObjectId ,ref:"Category" ,default:null},
    status: {type:Boolean, default:true}
 },{Timestamp:true})

 module.exports = mongoose.model("Category", categorySchema);