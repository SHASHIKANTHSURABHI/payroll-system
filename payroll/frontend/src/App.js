import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center text-primary mb-4">Payroll System</h1>

        {isLoggedIn && (
          <nav className="mb-4 text-center">
            <Link to="/" className="btn btn-outline-primary mr-2">Employee Manager</Link>
            <Link to="/dashboard" className="btn btn-outline-success mr-2">Dashboard</Link>
            <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
          </nav>
        )}

        <Routes>
          <Route
            path="/"
            element={<PrivateRoute><EmployeeList /></PrivateRoute>}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
