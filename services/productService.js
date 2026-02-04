const mongoose = require("mongoose");
const userModel = require('../models/productModel');


const findProduct = async ({name}) => {
    return await userModel.findOne({
        $or: [
            {product_name: name}
        ]
    });
}

module.exports = {findProduct};