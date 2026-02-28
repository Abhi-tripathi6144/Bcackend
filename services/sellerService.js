const mongoose = require("mongoose");
const sellerModel = require('../models/sellerModel');


const findSeller = async ({name, email, contact, aadhar}) => {
    return await sellerModel.findOne({
        $or: [
            {first_name: name},
            {email: email},
            {mobile_number: contact},
            {aadhar_number: aadhar}
        ]
    });
}

module.exports = {findSeller};