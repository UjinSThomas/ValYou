const Transaction = require('../models/Transaction');

// ➕ Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction({
      ...req.body,
      userId: req.user,
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add transaction', error: err });
  }
};

// 📥 Get All Transactions for Logged-in User
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user }) 
      .sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: err });
  }
};

// 📝 Update Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.user}, 
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update transaction', error: err });
  }
};

// ❌ Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findOneAndDelete({ _id: id, userId: req.user}); 
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete transaction', error: err });
  }
};

// 🚩 Get Distinct Categories for User
exports.getCategories = async (req, res) => {
  try {
    const filter = { userId: req.user };
    if (req.query.type) {
      filter.type = req.query.type;
    }
    const categories = await Transaction.distinct('category', filter);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err });
  }
};
