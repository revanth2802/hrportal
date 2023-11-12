
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import SearchBar from "./SearchBar";
// import EmployeeTable from "./EmployeeTable";
// import EmployeeDetails from "./EmployeeDetails";
// import EmployeeForm from "./EmployeeForm";
// import { withAuthenticationRequired } from "@auth0/auth0-react";
// import "./EmployeesPage.css";

// function EmployeesPage() {
//   console.log("EmployeesPage: Rendering...");

//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [maxPages, setMaxPages] = useState(1);
//   const [showForm, setShowForm] = useState(false);
//   const [employeeToEdit, setEmployeeToEdit] = useState(null);

//   const fetchEmployees = useCallback(() => {
//     let url = `https://localhost:5000/employees?page=${currentPage}`;

//     if (searchQuery) {
//       url += `&search_term=${searchQuery}`;
//     }

//     axios
//       .get(url)
//       .then((response) => {
//         setEmployees(response.data.data);
//         setMaxPages(response.data.pagination.total_pages);
//       })
//       .catch((error) => {
//         console.error("Error fetching employees:", error);
//       });
//   }, [searchQuery, currentPage]);

//   useEffect(() => {
//     fetchEmployees();
//   }, [searchQuery, currentPage, fetchEmployees]);

//   const handlePageChange = (direction) => {
//     if (direction === "prev" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     } else if (direction === "next" && currentPage < maxPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1); 
//   };

//   const deleteEmployee = (emp_no) => {
//     axios
//       .delete(`https://localhost:5000/employees/${emp_no}`)
//       .then(() => {
//         const updatedEmployees = employees.filter(
//           (emp) => emp.emp_no !== emp_no
//         );
//         setEmployees(updatedEmployees);
//       })
//       .catch((error) => {
//         console.error("Error deleting employee:", error);
//       });
//   };
//   const handleEditEmployee = (employee) => {
//     setEmployeeToEdit(employee);
//     setShowForm(true);
//   };

//   return (
//     <div className="container">
//       <SearchBar onSearch={handleSearch} />
//       <div>
//         <button
//           className="new-employee-btn"
//           onClick={() => setShowForm(!showForm)}
//         >
//           New Employee
//         </button>
//       </div>
//       {showForm && <EmployeeForm employee={employeeToEdit} />}

//       <EmployeeTable
//         employees={employees}
//         onSelectEmployee={setSelectedEmployee}
//         onDeleteEmployee={deleteEmployee}
//         onEditEmployee={handleEditEmployee} 
//       />
//       <EmployeeDetails employee={selectedEmployee} />
//       <div className="pagination-controls">
//         <button
//           onClick={() => handlePageChange("prev")}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {maxPages}
//         </span>
//         <button
//           onClick={() => handlePageChange("next")}
//           disabled={currentPage === maxPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default withAuthenticationRequired(EmployeesPage);

// import React, { useState, useEffect, useCallback } from "react";
// import { withAuthenticationRequired } from "@auth0/auth0-react";
// import EmployeeService from "../services/EmployeeService"; // Adjust the path as necessary
// import useAuth0Api from "../api"; // Adjust the path as necessary
// import SearchBar from "./SearchBar";
// import EmployeeTable from "./EmployeeTable";
// import EmployeeDetails from "./EmployeeDetails";
// import EmployeeForm from "./EmployeeForm";
// import "./EmployeesPage.css";

// function EmployeesPage() {
//   console.log("EmployeesPage: Rendering...");

//   const api = useAuth0Api(); // Obtain the API with the Auth0 token
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [maxPages, setMaxPages] = useState(1);
//   const [showForm, setShowForm] = useState(false);
//   const [employeeToEdit, setEmployeeToEdit] = useState(null);

//   const fetchEmployees = useCallback(() => {
//     EmployeeService.fetchEmployees(api, currentPage, searchQuery)
//       .then((response) => {
//         setEmployees(response.data.data);
//         setMaxPages(response.data.pagination.total_pages);
//       })
//       .catch((error) => {
//         console.error("Error fetching employees:", error);
//       });
//   }, [api, searchQuery, currentPage]);

//   useEffect(() => {
//     fetchEmployees();
//   }, [searchQuery, currentPage, fetchEmployees]);

//   const handlePageChange = (direction) => {
//     if (direction === "prev" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     } else if (direction === "next" && currentPage < maxPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   const deleteEmployee = (emp_no) => {
//     EmployeeService.deleteEmployee(api, emp_no)
//       .then(() => {
//         const updatedEmployees = employees.filter(emp => emp.emp_no !== emp_no);
//         setEmployees(updatedEmployees);
//       })
//       .catch((error) => {
//         console.error("Error deleting employee:", error);
//       });
//   };

//   const handleEditEmployee = (employee) => {
//     setEmployeeToEdit(employee);
//     setShowForm(true);
//   };

//   return (
//     <div className="container">
//       <SearchBar onSearch={handleSearch} />
//       <div>
//         <button
//           className="new-employee-btn"
//           onClick={() => setShowForm(!showForm)}
//         >
//           New Employee
//         </button>
//       </div>
//       {showForm && <EmployeeForm employee={employeeToEdit} />}
//       <EmployeeTable
//         employees={employees}
//         onSelectEmployee={setSelectedEmployee}
//         onDeleteEmployee={deleteEmployee}
//         onEditEmployee={handleEditEmployee}
//       />
//       <EmployeeDetails employee={selectedEmployee} />
//       <div className="pagination-controls">
//         <button
//           onClick={() => handlePageChange("prev")}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {maxPages}
//         </span>
//         <button
//           onClick={() => handlePageChange("next")}
//           disabled={currentPage === maxPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default withAuthenticationRequired(EmployeesPage);

// import React, { useState, useEffect, useCallback } from "react";
// import { withAuthenticationRequired } from "@auth0/auth0-react";
// import EmployeeService from "../services/EmployeeService"; // Adjust the path as necessary
// import useAuth0Api from "../api"; // Adjust the path as necessary
// import SearchBar from "./SearchBar";
// import EmployeeTable from "./EmployeeTable";
// import EmployeeDetails from "./EmployeeDetails";
// import EmployeeForm from "./EmployeeForm";
// import "./EmployeesPage.css";

// function EmployeesPage() {
//   console.log("EmployeesPage: Rendering...");

//   const api = useAuth0Api(); // Obtain the API with the Auth0 token
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [maxPages, setMaxPages] = useState(1);
//   const [showForm, setShowForm] = useState(false);
//   const [employeeToEdit, setEmployeeToEdit] = useState(null);

//   const fetchEmployees = useCallback(() => {
//     EmployeeService.fetchEmployees(api, currentPage, searchQuery)
//       .then((response) => {
//         setEmployees(response.data.data);
//         setMaxPages(response.data.pagination.total_pages);
//       })
//       .catch((error) => {
//         console.error("Error fetching employees:", error);
//       });
//   }, [api, searchQuery, currentPage]);

//   useEffect(() => {
//     fetchEmployees();
//   }, [searchQuery, currentPage, fetchEmployees]);

//   const handlePageChange = (direction) => {
//     if (direction === "prev" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     } else if (direction === "next" && currentPage < maxPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   const deleteEmployee = (emp_no) => {
//     EmployeeService.deleteEmployee(api, emp_no)
//       .then(() => {
//         const updatedEmployees = employees.filter(emp => emp.emp_no !== emp_no);
//         setEmployees(updatedEmployees);
//       })
//       .catch((error) => {
//         console.error("Error deleting employee:", error);
//       });
//   };

//   const handleEditEmployee = (employee) => {
//     setEmployeeToEdit(employee);
//     setShowForm(true);
//   };

//   return (
//     <div className="container">
//       <SearchBar onSearch={handleSearch} />
//       <div>
//         <button
//           className="new-employee-btn"
//           onClick={() => setShowForm(!showForm)}
//         >
//           New Employee
//         </button>
//       </div>
//       {showForm && <EmployeeForm employee={employeeToEdit} />}
//       <EmployeeTable
//         employees={employees}
//         onSelectEmployee={setSelectedEmployee}
//         onDeleteEmployee={deleteEmployee}
//         onEditEmployee={handleEditEmployee}
//       />
//       <EmployeeDetails employee={selectedEmployee} />
//       <div className="pagination-controls">
//         <button
//           onClick={() => handlePageChange("prev")}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {maxPages}
//         </span>
//         <button
//           onClick={() => handlePageChange("next")}
//           disabled={currentPage === maxPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default withAuthenticationRequired(EmployeesPage);

//Original code: 
// import React, { useState, useEffect, useCallback } from "react";
// import { withAuthenticationRequired } from "@auth0/auth0-react";
// import EmployeeService from "../services/EmployeeService"; // Adjust the path as necessary
// import useAuth0Api from "../api"; // Adjust the path as necessary
// import SearchBar from "./SearchBar";
// import EmployeeTable from "./EmployeeTable";
// import EmployeeDetails from "./EmployeeDetails";
// import EmployeeForm from "./EmployeeForm";
// import "./EmployeesPage.css";

// const EmployeesPage = () => {
//   const api = useAuth0Api(); // Obtain the API with the Auth0 token
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [maxPages, setMaxPages] = useState(1);
//   const [showForm, setShowForm] = useState(false);
//   const [employeeToEdit, setEmployeeToEdit] = useState(null);

//   const fetchEmployees = useCallback(async () => {
//     try {
//       const response = await EmployeeService.fetchEmployees(api, currentPage, searchQuery);
//       setEmployees(response.data);
//       setMaxPages(response.pagination.total_pages);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   }, [api, searchQuery, currentPage]);

//   useEffect(() => {
//     fetchEmployees();
//   }, [fetchEmployees]);

//   const handlePageChange = (direction) => {
//     setCurrentPage((prev) => {
//       if (direction === "prev" && prev > 1) {
//         return prev - 1;
//       } else if (direction === "next" && prev < maxPages) {
//         return prev + 1;
//       }
//       return prev;
//     });
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   const deleteEmployee = async (empNo) => {
//     try {
//       await EmployeeService.deleteEmployee(api, empNo);
//       setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.emp_no !== empNo));
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//     }
//   };

//   const handleEditEmployee = (employee) => {
//     setEmployeeToEdit(employee);
//     setShowForm(true);
//   };

//   return (
//     <div className="container">
//       <SearchBar onSearch={handleSearch} />
//       <div>
//         <button className="new-employee-btn" onClick={() => setShowForm(!showForm)}>
//           {showForm ? 'Cancel' : 'New Employee'}
//         </button>
//       </div>
//       {showForm && (
//         <EmployeeForm
//           employee={employeeToEdit}
//           onSave={() => {
//             setShowForm(false);
//             fetchEmployees(); // Refresh the list after saving
//           }}
//           onCancel={() => setShowForm(false)}
//         />
//       )}
//       <EmployeeTable
//         employees={employees}
//         onSelectEmployee={setSelectedEmployee}
//         onDeleteEmployee={deleteEmployee}
//         onEditEmployee={handleEditEmployee}
//       />
//       {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
//       <div className="pagination-controls">
//         <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {maxPages}
//         </span>
//         <button onClick={() => handlePageChange("next")} disabled={currentPage === maxPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default withAuthenticationRequired(EmployeesPage, {
//   onRedirecting: () => <div>Loading...</div>,
// });
// //new code: 

import React, { useState, useEffect, useCallback } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import EmployeeService from "../services/EmployeeService"; // Adjust the path as necessary
import SearchBar from "./SearchBar";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetails from "./EmployeeDetails";
import EmployeeForm from "./EmployeeForm";
import "./EmployeesPage.css";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await EmployeeService.fetchEmployees(currentPage, searchQuery);
      
      setEmployees(response.data.data); 
      setMaxPages(response.data.pagination.total_pages);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, [searchQuery, currentPage]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "prev" && prev > 1) {
        return prev - 1;
      } else if (direction === "next" && prev < maxPages) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const deleteEmployee = async (empNo) => {
    try {
      await EmployeeService.deleteEmployee(empNo);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.emp_no !== empNo));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setShowForm(true);
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      <div>
        <button className="new-employee-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Employee'}
        </button>
      </div>
      {showForm && (
        <EmployeeForm
          employee={employeeToEdit}
          onSave={() => {
            setShowForm(false);
            fetchEmployees(); // Refresh the list after saving
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      <EmployeeTable
        employees={employees}
        onSelectEmployee={setSelectedEmployee}
        onDeleteEmployee={deleteEmployee}
        onEditEmployee={handleEditEmployee}
      />
      {selectedEmployee && <EmployeeDetails employee={selectedEmployee} />}
      <div className="pagination-controls">
        <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {maxPages}
        </span>
        <button onClick={() => handlePageChange("next")} disabled={currentPage === maxPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default withAuthenticationRequired(EmployeesPage, {
  onRedirecting: () => <div>Loading...</div>,
});

