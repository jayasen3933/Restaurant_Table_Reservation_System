const express = require('express');
const { 
  getAllTables, 
  createTable, 
  updateTableStatus,
  deleteTable 
} = require('../controllers/tableController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getAllTables)
  .post(protect, authorize('admin'), createTable);

router.route('/:id')
  .put(protect, authorize('admin'), updateTableStatus)
  .delete(protect, authorize('admin'), deleteTable);

module.exports = router;
