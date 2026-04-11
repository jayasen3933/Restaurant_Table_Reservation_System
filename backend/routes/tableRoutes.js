const express = require('express');
const { 
  getAllTables, 
  createTable, 
  deleteTable 
} = require('../controllers/tableController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getAllTables)
  .post(protect, authorize('admin'), createTable);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteTable);

module.exports = router;
