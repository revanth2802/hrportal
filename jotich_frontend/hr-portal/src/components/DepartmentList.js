import React from "react";

function DepartmentList({ departments, onSelectDepartment }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>
                <button onClick={() => onSelectDepartment(department.id)}>View Employees</button>
                {/* Other CRUD actions can go here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  