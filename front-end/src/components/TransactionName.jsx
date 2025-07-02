import React from 'react';

function TransactionName({ transactions, onDelete, onEdit }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.type}</td>
              <td>{tx.category}</td>
              <td>₹{tx.amount}</td>
              <td>{tx.description}</td>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(tx)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(tx._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TransactionName;