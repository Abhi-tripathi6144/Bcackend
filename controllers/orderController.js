const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({
        message: "userId required",
      });
    }
    const cartItems = await Cart.find({ userId });

    if (cartItems.length === 0) {
      return res.json({
        message: "no items in cart",
      });
    }
    let total = 0;
    const products = cartItems.map((item) => {
      total += item.price * item.Quantity;

      return {
        productId: item.productId,
        brand: item.brand,
        rating: item.rating,
        quantity: item.Quantity,
        price: item.price,
      };
    });

    await Order.create({
      userId,
      products,
      totalAmount: total,
    });

    await Cart.deleteMany({ userId });

    return res.json({
      message: "Order placed successfully",
    });
  } catch (error) {
    return res.json({
      message: "Error in placing order",
      error: error.message,
    });
  }
};

const viewOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.json({
        message: "userId required",
      });
    }
    const checkData = await Order.find({userId: userId})
    if(!checkData){
        return res.json({
        message: "no orders yet",
      });
    }
    return res.json({
        messags: "ordered products",
        products: checkData,
    })
  } catch (error) {
    return res.json({
        message: "error in viewing orders",
      });
  }
};

module.exports = { placeOrder, viewOrders };
