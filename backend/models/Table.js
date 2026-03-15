const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: [true, 'Please provide a table number'],
    unique: true
  },
  capacity: {
    type: Number,
    required: [true, 'Please provide table capacity'],
    min: [1, 'Capacity must be at least 1']
  },
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Table', tableSchema);
