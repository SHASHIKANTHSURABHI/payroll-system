import React, { useState } from 'react';
import api from '../services/api';

function EmployeeForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    basic_salary: '',
    allowance: '',
    deductions: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('employees/', formData)
      .then(res => {
        onAdd(res.data); // Add new employee to list
        setFormData({ name: '', role: '', basic_salary: '', allowance: '', deductions: '' });
      })
      .catch(err => {
        console.error('Error adding employee:', err);
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Add Employee</h3>
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
      <input name="basic_salary" type="number" placeholder="Basic Salary" value={formData.basic_salary} onChange={handleChange} required />
      <input name="allowance" type="number" placeholder="Allowance" value={formData.allowance} onChange={handleChange} required />
      <input name="deductions" type="number" placeholder="Deductions" value={formData.deductions} onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default EmployeeForm;
