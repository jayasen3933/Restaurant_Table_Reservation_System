const Review = require('../models/Review');
const Reservation = require('../models/Reservation');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { reservationId, rating, category, comment, userId, customerName } = req.body;

    // Check if reservation exists and is completed
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    if (reservation.status !== 'completed') {
      return res.status(400).json({ 
        message: 'You can only review completed reservations' 
      });
    }

    // Check if user already reviewed this reservation
    const existingReview = await Review.findOne({ 
      reservationId, 
      userId 
    });

    if (existingReview) {
      return res.status(400).json({ 
        message: 'You have already reviewed this reservation' 
      });
    }

    const review = await Review.create({
      userId,
      reservationId,
      rating,
      category,
      comment,
      customerName
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews (admin can see all, customers see their own)
exports.getAllReviews = async (req, res) => {
  try {
    const { userId, status } = req.query;
    let query = {};

    if (userId) {
      query.userId = userId;
    }

    if (status) {
      query.status = status;
    }

    const reviews = await Review.find(query)
      .populate('userId', 'name email')
      .populate('reservationId', 'date time tableId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('reservationId');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update review status (admin only)
exports.updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if user can review a reservation
exports.canReview = async (req, res) => {
  try {
    const { reservationId, userId } = req.query;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check if reservation is completed
    if (reservation.status !== 'completed') {
      return res.status(200).json({
        canReview: false,
        reason: 'Reservation not yet completed'
      });
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({ reservationId, userId });
    if (existingReview) {
      return res.status(200).json({
        canReview: false,
        reason: 'Already reviewed'
      });
    }

    res.status(200).json({
      canReview: true
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
