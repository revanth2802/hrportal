import React, { useState } from 'react';
import SalariesService from '../../services/SalariesService';

import './AddSalaryForm.css'


function AddSalaryForm() {
    const [formData, setFormData] = useState({
        emp_no: '',
        salary: '',
        from_date: '',
        to_date: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        SalariesService.addSalary(formData)
            .then(response => {
                console.log("Salary added successfully:", response);
                // TODO: Handle success (e.g., clear the form, show a success message)
            })
            .catch(error => {
                console.error("Error adding salary:", error);
                // TODO: Handle error (e.g., show an error message)
            });
    };

    return (
        <form onSubmit={handleSubmit} className="add-salary-form">
            <div className="input-group">
                <label>Employee Number:</label>
                <input type="number" value={formData.emp_no} onChange={e => setFormData({ ...formData, emp_no: e.target.value })} required />
            </div>
            <div className="input-group">
                <label>Salary:</label>
                <input type="number" value={formData.salary} onChange={e => setFormData({ ...formData, salary: e.target.value })} required />
            </div>
            <div className="input-group">
                <label>From Date:</label>
                <input type="date" value={formData.from_date} onChange={e => setFormData({ ...formData, from_date: e.target.value })} required />
            </div>
            <div className="input-group">
                <label>To Date:</label>
                <input type="date" value={formData.to_date} onChange={e => setFormData({ ...formData, to_date: e.target.value })} required />
            </div>
            <button type="submit">Add Salary</button>
        </form>
    );
    
}

export default AddSalaryForm;
