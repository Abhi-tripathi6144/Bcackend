const mongoose = require("mongoose");
const sellerModel = require('../models/sellerModel');


const findSeller = async ({id, name, contact}) => {
    return await sellerModel.findOne({
        $or: [
            {seller_id: id},
            {shop_name: name},
            {contact_no: contact}
        ]
    });
}

module.exports = {findSeller};