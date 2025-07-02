const express = require('express');
const router = express.Router();
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getCategories,
} = require('../controllers/transactionController');

const authMiddleware = require('../middleware/authMiddleware');

// ✅ Protected Routes
router.post('/add', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactions);
router.put('/:id', authMiddleware, updateTransaction);
router.delete('/:id', authMiddleware, deleteTransaction);
router.get('/categories', authMiddleware, getCategories);

module.exports = router;
