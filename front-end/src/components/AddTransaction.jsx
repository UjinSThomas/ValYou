import React, { useState, useEffect } from 'react';
import axios from 'axios';

const COMMON_CATEGORIES = {
  income: ["Salary", "Business", "Interest", "Gift", "Investment", "Other"],
  expense: ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Other"],
};

function AddTransaction({ onTransactionAdded, selectedTransaction, setSelectedTransaction }) {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [prevCategories, setPrevCategories] = useState([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  useEffect(() => {
    if (selectedTransaction) {
      setAmount(selectedTransaction.amount);
      setType(selectedTransaction.type);
      setCategory(selectedTransaction.category);
      setDescription(selectedTransaction.description);
    }
  }, [selectedTransaction]);

  useEffect(() => {
    // Fetch previous categories for the selected type
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:3000/api/transactions/categories?type=${type}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrevCategories(res.data || []);
      } catch (err) {
        setPrevCategories([]);
      }
    };
    fetchCategories();
  }, [type]);

  // Combine common and previous categories, remove duplicates, always include 'Other' only once at the end
  const categoryOptions = Array.from(
    new Set([...(COMMON_CATEGORIES[type] || []).filter(c => c !== 'Other'), ...prevCategories.filter(c => c && c !== 'Other')])
  ).concat('Other');

  useEffect(() => {
    // Show custom input if 'Other' is selected
    setShowCustomCategory(category === 'Other');
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== 'Other') setShowCustomCategory(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setStatus('');

    const payload = { amount, type, category, description };

    try {
      if (selectedTransaction) {
        await axios.put(
          `http://localhost:3000/api/transactions/${selectedTransaction._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatus('Transaction updated!');
        setSelectedTransaction(null); // reset after editing
      } else {
        await axios.post(
          'http://localhost:3000/api/transactions/add',
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatus('Transaction added!');
      }

      setAmount('');
      setCategory('');
      setDescription('');
      if (onTransactionAdded) onTransactionAdded();
    } catch (err) {
      console.error(err);
      setStatus('Failed to submit transaction.');
    }
  };

  return (
   <div className="card p-4 shadow-sm">

      <h4>{selectedTransaction ? 'Edit' : 'Add'} Transaction</h4>
      {status && <div className="alert alert-info">{status}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Amount</label>
          <input type="number" className="form-control" value={amount}
            onChange={(e) => setAmount(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Type</label>
          <select className="form-select" value={type}
            onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Category</label>
          <select
            className="form-select"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="" disabled>Select category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {showCustomCategory && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter custom category"
              value={category === 'Other' ? '' : category}
              onChange={e => setCategory(e.target.value)}
              required
            />
          )}
        </div>

        <div className="mb-3">
          <label>Description</label>
          <input type="text" className="form-control" value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">
          {selectedTransaction ? 'Update' : 'Add'} Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
