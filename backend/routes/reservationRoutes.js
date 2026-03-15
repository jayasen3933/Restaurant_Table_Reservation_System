const express = require('express');
const { 
  checkAvailability,
  createReservation, 
  getAllReservations,
  getReservationById,
  updateReservationStatus,
  deleteReservation
} = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/check-availability', checkAvailability);

router.route('/')
  .get(protect, authorize('admin'), getAllReservations)
  .post(createReservation);

router.route('/:id')
  .get(protect, getReservationById)
  .delete(protect, authorize('admin'), deleteReservation);

router.put('/:id/status', protect, authorize('admin'), updateReservationStatus);

module.exports = router;
