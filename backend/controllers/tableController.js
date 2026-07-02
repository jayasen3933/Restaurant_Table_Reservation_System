const Table = require('../models/Table');

// Official capacity mapping - must match frontend/src/data/tableData.js
const CAPACITY_MAP = {
  1: 4,
  2: 5,
  3: 2,
  4: 3,
  5: 6,
  6: 1,
  7: 8,
  8: 7
};

exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.status(200).json({
      success: true,
      count: tables.length,
      data: tables
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTable = async (req, res) => {
  try {
    const { tableNumber, capacity } = req.body;

    const tableExists = await Table.findOne({ tableNumber });
    if (tableExists) {
      return res.status(400).json({ message: 'Table number already exists' });
    }

    const table = await Table.create({
      tableNumber,
      capacity
    });

    res.status(201).json({
      success: true,
      data: table
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Table deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Initialize/sync tables with the official capacity mapping
exports.initTables = async (req, res) => {
  try {
    const results = [];
    for (const [tableNumber, capacity] of Object.entries(CAPACITY_MAP)) {
      const table = await Table.findOneAndUpdate(
        { tableNumber: parseInt(tableNumber) },
        { tableNumber: parseInt(tableNumber), capacity },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      results.push(table);
    }
    res.status(200).json({
      success: true,
      message: 'Tables initialized/synced with official capacity mapping',
      data: results
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

