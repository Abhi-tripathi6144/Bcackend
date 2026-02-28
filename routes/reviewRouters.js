const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post("/review-add", reviewController.addProductReview);

module.exports = router;