const express = require('express');
const { 
  getAllUsers, 
  getUserById,
  updateUserRole,
  deleteUser,
  getStats,
  cleanupDatabase
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getStats);
router.post('/cleanup', cleanupDatabase);
router.route('/')
  .get(getAllUsers);

router.route('/:id')
  .get(getUserById)
  .put(updateUserRole)
  .delete(deleteUser);

module.exports = router;
