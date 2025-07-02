import React from 'react';

function TransactionSummary({ transactions }) {
  const income = transactions.filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="row text-center mb-4">
      <div className="col-md-4 mb-2">
        <div className="card text-white" style={{background: '#00b894', border: 'none', borderRadius: '1.2rem', boxShadow: '0 4px 16px rgba(0,184,148,0.10)'}}>
          <div className="card-body">
            <h5 className="card-title">Income</h5>
            <h4 className="card-text">₹{income}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-2">
        <div className="card text-white" style={{background: '#ff7675', border: 'none', borderRadius: '1.2rem', boxShadow: '0 4px 16px rgba(255,118,117,0.10)'}}>
          <div className="card-body">
            <h5 className="card-title">Expense</h5>
            <h4 className="card-text">₹{expense}</h4>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-2">
        <div className="card text-white" style={{background: '#0984e3', border: 'none', borderRadius: '1.2rem', boxShadow: '0 4px 16px rgba(9,132,227,0.10)'}}>
          <div className="card-body">
            <h5 className="card-title">Balance</h5>
            <h4 className="card-text">₹{balance}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionSummary;