import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:3000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="card p-4">
      <h4 className="mb-3">Your Transactions</h4>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="list-group">
          {transactions.map((tx) => (
            <li key={tx._id} className="list-group-item">
              <strong>{tx.category}</strong> - ₹{tx.amount} ({tx.type})<br />
              <small>{new Date(tx.date).toLocaleDateString()}</small>
              {tx.description && <div>{tx.description}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
