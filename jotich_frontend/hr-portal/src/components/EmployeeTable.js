import React from "react";
import "./EmployeesTable.css";

function EmployeeTable({
  employees,
  onSelectEmployee,
  onDeleteEmployee,
  onEditEmployee,
}) {
  const handleDelete = (emp_no) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      onDeleteEmployee(emp_no);
    }
  };

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Employee No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.emp_no}>
              <td>{emp.emp_no}</td>
              <td>{emp.first_name}</td>
              <td>{emp.last_name}</td>
              <td>
                <button className="btn" onClick={() => onSelectEmployee(emp)}>
                  View
                </button>
                <button className="btn" onClick={() => onEditEmployee(emp)}>
                  Edit
                </button>

                <button
                  className="btn"
                  onClick={() => handleDelete(emp.emp_no)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
