const User = require('../models/User');
const Reservation = require('../models/Reservation');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!['customer', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const deletedReservations = await Reservation.deleteMany({ email: user.email });

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `User deleted successfully along with ${deletedReservations.deletedCount} associated reservation(s)`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cleanupDatabase = async (req, res) => {
  try {
    const adminUser = await User.findOne({ role: 'admin' });
    const keepCustomer = await User.findOne({ 
      name: { $regex: /chada jayasen/i } 
    });

    const keepUserIds = [];
    const keepEmails = [];

    if (adminUser) {
      keepUserIds.push(adminUser._id);
      keepEmails.push(adminUser.email);
    }
    if (keepCustomer) {
      keepUserIds.push(keepCustomer._id);
      keepEmails.push(keepCustomer.email);
    }

    const deletedUsers = await User.deleteMany({
      _id: { $nin: keepUserIds }
    });

    const deletedReservations = await Reservation.deleteMany({
      email: { $nin: keepEmails }
    });

    res.status(200).json({
      success: true,
      message: 'Database cleanup completed',
      details: {
        usersDeleted: deletedUsers.deletedCount,
        reservationsDeleted: deletedReservations.deletedCount,
        keptUsers: keepUserIds.length,
        keptAdmin: adminUser ? adminUser.name : 'Not found',
        keptCustomer: keepCustomer ? keepCustomer.name : 'Not found'
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const customerUsers = await User.countDocuments({ role: 'customer' });

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        adminUsers,
        customerUsers
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
