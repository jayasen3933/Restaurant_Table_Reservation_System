const Table = require('../models/Table');

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
      capacity,
      status: 'available'
    });

    res.status(201).json({
      success: true,
      data: table
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTableStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.status(200).json({
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
