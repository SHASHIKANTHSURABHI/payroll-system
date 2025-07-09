import React, { useEffect, useState } from 'react';
import api from '../services/api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    basic_salary: '',
    allowance: '',
    deductions: '',
    tax_rate: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    api.get('employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Error fetching employees:', err));
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = isEditing ? api.put : api.post;
    const url = isEditing ? `employees/${editId}/` : 'employees/';

    method(url, formData)
      .then(() => {
        fetchEmployees();
        setFormData({
          name: '',
          role: '',
          basic_salary: '',
          allowance: '',
          deductions: '',
          tax_rate: ''
        });
        setIsEditing(false);
        setEditId(null);
      })
      .catch(err => console.error('Error saving employee:', err));
  };

  const handleEdit = (emp) => {
    setFormData({
      name: emp.name,
      role: emp.role,
      basic_salary: emp.basic_salary,
      allowance: emp.allowance,
      deductions: emp.deductions,
      tax_rate: emp.tax_rate
    });
    setIsEditing(true);
    setEditId(emp.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      api.delete(`employees/${id}/`)
        .then(() => fetchEmployees())
        .catch(err => console.error('Error deleting employee:', err));
    }
  };

  return (
    <div>
      <h2 className="text-success">Employee List</h2>

      {/* Payroll Summary */}
<div className="mb-4">
  <h4 className="text-primary">Payroll Summary</h4>
  <ul className="list-group">
    <li className="list-group-item">
      <strong>Total Employees:</strong> {employees.length}
    </li>
    <li className="list-group-item">
      <strong>Total Net Salary Paid:</strong> ₹{employees.reduce((sum, emp) => sum + parseFloat(emp.net_salary || 0), 0)}
    </li>
    <li className="list-group-item">
      <strong>Average Net Salary:</strong> ₹{
        employees.length
          ? (employees.reduce((sum, emp) => sum + parseFloat(emp.net_salary || 0), 0) / employees.length).toFixed(2)
          : 0
      }
    </li>
  </ul>
</div>

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-4">
            <label>Role</label>
            <input type="text" className="form-control" name="role" value={formData.role} onChange={handleChange} required />
          </div>
          <div className="form-group col-md-4">
            <label>Basic Salary</label>
            <input type="number" className="form-control" name="basic_salary" value={formData.basic_salary} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label>Allowance</label>
            <input type="number" className="form-control" name="allowance" value={formData.allowance} onChange={handleChange} />
          </div>
          <div className="form-group col-md-4">
            <label>Deductions</label>
            <input type="number" className="form-control" name="deductions" value={formData.deductions} onChange={handleChange} />
          </div>
          <div className="form-group col-md-4">
            <label>Tax Rate (%)</label>
            <input
              type="number"
              className="form-control"
              name="tax_rate"
              value={formData.tax_rate || ''}
              onChange={handleChange}
              step="0.01"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update Employee' : 'Add Employee'}
        </button>

        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => {
              setIsEditing(false);
              setEditId(null);
              setFormData({
                name: '',
                role: '',
                basic_salary: '',
                allowance: '',
                deductions: '',
                tax_rate: ''
              });
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Employee Cards */}
      <div className="row">
        {employees.map(emp => (
          <div key={emp.id} className="col-md-4 mb-3">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{emp.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Role: {emp.role}</h6>
                <p className="card-text">
                  <strong>Basic Salary:</strong> ₹{emp.basic_salary}<br />
                  <strong>Allowance:</strong> ₹{emp.allowance}<br />
                  <strong>Deductions:</strong> ₹{emp.deductions}<br />
                  <strong>Tax Rate:</strong> {emp.tax_rate}%<br />
                  <strong>Net Salary:</strong> ₹{emp.net_salary}
                </p>

                <a
                  href={`http://127.0.0.1:8000/api/payslip/${emp.id}/pdf/`}
                  className="btn btn-sm btn-success mr-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Payslip
                </a>

                <button
                  className="btn btn-sm btn-warning mr-2"
                  onClick={() => handleEdit(emp)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;
