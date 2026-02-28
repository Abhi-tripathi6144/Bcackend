const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/cart-add-product', cartController.addProductInCart);
router.post('/cart-list/:userId', cartController.viewCartProducts);
router.post('/cart-remove/:id', cartController.removeFromCart);
module.exports = router;