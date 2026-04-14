const express = require('express');
const { 
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewStatus,
  deleteReview,
  canReview
} = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/can-review', canReview);

router.route('/')
  .get(protect, getAllReviews)
  .post(protect, createReview);

router.route('/:id')
  .get(protect, getReviewById)
  .delete(protect, authorize('admin'), deleteReview);

router.put('/:id/status', protect, authorize('admin'), updateReviewStatus);

module.exports = router;
