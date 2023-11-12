import React from 'react';

function DepartmentCard({ dept }) {
  return (
    <div className="department-card">
      <h3>{dept.dept_name}</h3>
      <p>Number of Employees: {dept.employee_count}</p>
    </div>
  );
}

export default DepartmentCard;
