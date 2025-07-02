import React from 'react';
import { Routes, Route ,Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Local';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
      <Route path="/" element={localStorage.getItem('token') ? <Navigate to="/dashboard" /> : <Navigate to="/login" /> }/>
    </Routes>
    </>
  );
}

export default App;
