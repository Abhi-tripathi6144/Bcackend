const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    seller_id: {type:Number, unique:true, required:true},
    shop_name: {type:String, require:true},
    contact_no: {type:Number, required:true},
    shop_description: {type:String},
    is_Verified: {type:Boolean}
},{timestamps:true})

module.exports = mongoose.model('seller', sellerSchema);