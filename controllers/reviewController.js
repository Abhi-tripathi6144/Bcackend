const reviewModel = require("../models/reviewModel");

const addProductReview = async (req, res) => {
  try {
    const {productId, comment, rating} = req.body;
    if(!productId || !comment || !rating){
        return res.json({
            message: "all fields required"
        })
    }
    
    const data = await reviewModel.create({productId, comment, rating});
    return res.json({
      message: "review added",
      data: data,
    });
  } catch (error) {
    return res.json({
      message: "error in review addition",
    });
  }
};

module.exports = {addProductReview};
