const mongoose = require("mongoose");
const sellerModel = require("../models/sellerModel");
const productModel = require("../models/productModel");

const findSeller = async ({ name, email, contact, aadhar }) => {
  return await sellerModel.findOne({
    $or: [
      { first_name: name },
      { email: email },
      { mobile_number: contact },
      { aadhar_number: aadhar },
    ],
  });
};
const getAllProducts = async (id) => {
  const products = await productModel.aggregate([
    {
      $match: { product_sellers: new mongoose.Types.ObjectId(id) },
    },
    {
        $lookup:{
            from:'sellers',
            localField:'product_sellers',
            foreignField:'_id',
            as: 'sellerDetails'
        }
    }
  ]);
  console.log(products);
  return products;
};

const getAllProductsWithSellerDetails = async(id) => {
  const products = await productModel.aggregate([
    {
      $match:{ product_sellers : new mongoose.Types.ObjectId(id)},
    },
    {
      $lookup:{
        from:"sellers",
        let:{sellerId: '$product_sellers'},
        pipeline:[
          {
            $match:{
              $expr :{$eq:['$_id','$$sellerId']}
            }
          },
          {
            $project:{
              _id:0,
              first_name:1,
              last_name:1,
            }
          }
        ],
        as:'sellerDetails'

      }
    }
  ])
  return products;

}

module.exports = { findSeller, getAllProducts, getAllProductsWithSellerDetails };
