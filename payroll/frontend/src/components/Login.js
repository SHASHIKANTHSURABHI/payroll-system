import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('token/', {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);

      onLogin(); // Notify App of successful login
      navigate('/'); // ✅ Redirect to homepage (Employee Manager)
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="text-center mb-3">Login</h3>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
