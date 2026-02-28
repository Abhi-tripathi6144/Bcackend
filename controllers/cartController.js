const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

const addProductInCart = async (req, res) => {
  try {
    const inputData = req.body;
    if (Object.keys(inputData) === 0) {
      return res.json({
        message: "give product Info",
        status_code: 404,
      });
    }
    const data = await cartModel.create(inputData);
    return res.json({
      message: "added in cart Successfully",
      data: data,
    });
  } catch (error) {
    res.json({
      message: "error in add to cart",
    });
  }
};

const viewCartProducts = async (req, res) => {
  try {
    const userId = req.params.userId;
    // console.log(await cartModel.find());
    const items = await cartModel.find({ userId }).populate("productId");

    return res.json({
      status: 200,
      data: items,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "error in cart list",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {

    const id= req.params.id;
    const check = await cartModel.findByIdAndDelete(id);
    if (!check) {
      return res.json({
        message: "failed cart deletion",
      });
    }
    return res.json({
      message: "successfully deletion",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "error in cart deletion",
    });
  }
};

module.exports = { addProductInCart, viewCartProducts ,removeFromCart};
