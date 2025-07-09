import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [filterRole, setFilterRole] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    api.get('employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Error:', err));
  };

  const filteredEmployees = filterRole
    ? employees.filter(emp => emp.role.toLowerCase().includes(filterRole.toLowerCase()))
    : employees;

  const totalNetSalary = filteredEmployees.reduce((sum, emp) => sum + parseFloat(emp.net_salary || 0), 0);
  const averageSalary = filteredEmployees.length ? (totalNetSalary / filteredEmployees.length).toFixed(2) : 0;

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Payroll Dashboard</h2>

      {/* Filter */}
      <div className="form-group">
        <label>Filter by Role</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Developer"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        />
      </div>

      {/* Summary */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Total Employees</h5>
            <p>{filteredEmployees.length}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Total Net Salary</h5>
            <p>₹{totalNetSalary}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>Average Net Salary</h5>
            <p>₹{averageSalary}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-5">
        <h4>Net Salary by Employee</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredEmployees} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="net_salary" fill="#28a745" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
