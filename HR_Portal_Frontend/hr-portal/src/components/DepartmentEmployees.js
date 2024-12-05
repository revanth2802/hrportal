import React, { useState, useEffect } from "react";

function DepartmentEmployees({ departmentId }) {
    const [employees, setEmployees] = useState([]);
  
    useEffect(() => {
      // Fetch employees based on departmentId
      // Example: axios.get(`/departments/${departmentId}/employees`).then(...);
    }, [departmentId]);
  
    return (
      <div>
        <h3>Employees in {departmentId}</h3>
        <ul>
          {employees.map(emp => (
            <li key={emp.id}>{emp.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export  default DepartmentEmployees;