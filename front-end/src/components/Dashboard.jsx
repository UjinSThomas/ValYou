// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTransaction from './AddTransaction';
import TransactionName from './TransactionName';
import TransactionSummary from './TransactionSummary';
import TransactionPieChart from './TransactionPieChart';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState('');

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
    // Fetch user name
    const fetchUserName = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(res.data.name);
      } catch (err) {
        setUserName('');
      }
    };
    fetchUserName();
  }, []);

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTransactions();
    } catch (err) {
      console.error('Error deleting transaction', err);
    }
  };

  const filteredTransactions = transactions
    .filter(tx => (filter === 'all' ? true : tx.type === filter))
    .filter(tx =>
      tx.category.toLowerCase().includes(search.toLowerCase()) ||
      (tx.description && tx.description.toLowerCase().includes(search.toLowerCase()))
    );

  return (
  <div className="dashboard-bg">
  <div className="container-fluid py-4 px-5" style={{ minHeight: '100vh' }}>
    <div className="d-flex justify-content-end mb-3">
      <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
    </div>
    
      <div className="text-center mb-4">
      <h2 className="fw-bold">Welcome{userName ? `, ${userName}` : ''}</h2>
</div>

      <div className="row mb-4">
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-end">
          <div style={{ minHeight: '420px', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
            <AddTransaction
              onTransactionAdded={fetchTransactions}
              selectedTransaction={selectedTransaction}
              setSelectedTransaction={setSelectedTransaction}
            />
          </div>
        </div>
        <div className="col-12 col-lg-6 d-flex flex-column gap-3 mt-4 mt-lg-0">
          <TransactionSummary transactions={transactions} />
          <TransactionPieChart transactions={transactions} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-12">
          <div className="card shadow-sm p-3">
            <h5 className="text-center mb-3">Filter & Search</h5>
            <select className="form-select mb-2" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Search category or description"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="alert alert-warning text-center">No transactions found.</div>
      )}

      <div className="row">
        <div className="col-12">
          <TransactionName
            transactions={filteredTransactions}
            onDelete={deleteTransaction}
            onEdit={setSelectedTransaction}
          />
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Dashboard;

