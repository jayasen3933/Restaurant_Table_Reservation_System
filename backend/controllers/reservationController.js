const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

exports.checkAvailability = async (req, res) => {
  try {
    const { date, time, partySize } = req.query;

    if (!date || !time || !partySize) {
      return res.status(400).json({ 
        message: 'Please provide date, time, and party size' 
      });
    }

    const requestedDate = new Date(date + 'T00:00:00.000Z');
    const nextDay = new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000);

    const existingReservations = await Reservation.find({
      date: {
        $gte: requestedDate,
        $lt: nextDay
      },
      time: time,
      status: { $in: ['pending', 'confirmed', 'seated'] }
    });

    const currentBookingCount = existingReservations.length;
    
    if (currentBookingCount >= 4) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'This time slot is fully booked (maximum 4 reservations). Please select a different time or date.'
      });
    }

    const suitableTables = await Table.find({ 
      capacity: { $gte: parseInt(partySize) }
    }).sort({ capacity: 1 });

    const bookedTableIds = existingReservations.map(res => res.tableId.toString());

    const availableTables = suitableTables.filter(
      table => !bookedTableIds.includes(table._id.toString())
    );

    res.status(200).json({
      success: true,
      count: availableTables.length,
      data: availableTables,
      allTables: suitableTables,
      remainingSlots: 4 - currentBookingCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReservation = async (req, res) => {
  try {
    const { customerName, email, phone, date, time, partySize, tableId, userId } = req.body;

    console.log('=== Creating Reservation ===');
    console.log('Received userId:', userId);
    console.log('Request body:', req.body);

    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    if (table.capacity < partySize) {
      return res.status(400).json({ 
        message: 'Selected table capacity is insufficient for party size' 
      });
    }

    const requestedDate = new Date(date + 'T00:00:00.000Z');
    const nextDay = new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000);

    const existingReservationsForTimeSlot = await Reservation.find({
      date: {
        $gte: requestedDate,
        $lt: nextDay
      },
      time,
      status: { $in: ['pending', 'confirmed', 'seated'] }
    });

    if (existingReservationsForTimeSlot.length >= 4) {
      return res.status(400).json({ 
        message: 'This time slot is fully booked (maximum 4 reservations). Please select a different time or date.' 
      });
    }

    const conflictingReservation = await Reservation.findOne({
      tableId,
      date: {
        $gte: requestedDate,
        $lt: nextDay
      },
      time,
      status: { $in: ['pending', 'confirmed', 'seated'] }
    });

    if (conflictingReservation) {
      return res.status(400).json({ 
        message: 'Book at another time, already another customer booked' 
      });
    }

    const reservation = await Reservation.create({
      customerName,
      email,
      phone,
      date: new Date(date + 'T00:00:00.000Z'),
      time: time.trim(),
      partySize,
      tableId,
      userId: userId || null
    });

    console.log('Created reservation with userId:', reservation.userId);
    console.log('Reservation ID:', reservation._id);

    const populatedReservation = await Reservation.findById(reservation._id).populate('tableId');

    res.status(201).json({
      success: true,
      data: populatedReservation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const { date, status, email, userId } = req.query;
    let query = {};

    console.log('=== Getting All Reservations ===');
    console.log('Query params:', req.query);
    console.log('Received userId:', userId);

    if (date) {
      const requestedDate = new Date(date + 'T00:00:00.000Z');
      const nextDay = new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000);
      
      query.date = {
        $gte: requestedDate,
        $lt: nextDay
      };
    }

    if (status) {
      query.status = status;
    }

    if (email) {
      query.email = email;
    }

    if (userId) {
      query.userId = userId;
    }

    console.log('MongoDB query:', query);

    const reservations = await Reservation.find(query)
      .populate('tableId')
      .sort({ date: 1, time: 1 });

    console.log('Found reservations:', reservations.length);
    console.log('Reservation userIds:', reservations.map(r => ({ id: r._id, userId: r.userId })));

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('tableId');

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'seated', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('tableId');

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
