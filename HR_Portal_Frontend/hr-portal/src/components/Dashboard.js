

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDashboardService } from "../services/DashboardService"; 
import SalaryGrowthComponent from "./SalaryGrowthComponent";
import DepartmentDistributionChart from "./DepartmentDistributionChart";
import GenderDistributionChart from "./GenderDistributionChart"; 
import "./Dashboard.css";

function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    averageSalary: 0.0,
    recentHires: 0,
    departmentDistribution: [],
    genderDistribution: {},
  });

  const { fetchDashboardMetrics } = useDashboardService();

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const data = await fetchDashboardMetrics();
        console.log('Fetched data:', data);
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
      }
    };

    getMetrics();
  }, [fetchDashboardMetrics]);

  return (
    <div className="dashboard-container">
      <div className="common-width-container">
        <h1>TechCube Analytics</h1>
        <div className="navigation-links">
          <Link to="/employees">Employees</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/salaries">Salaries</Link>
          <Link to="/titles">Titles</Link>
          {/* <Link to="/documents">Documents</Link>  */}
        </div>
        
        <div className="dashboard-metrics">
          <p>Total Employees: {metrics.totalEmployees}</p>
          <p>Total Departments: {metrics.totalDepartments}</p>
          <p>Average Salary: ${metrics.averageSalary.toFixed(2)}</p>
          {/* <p>Recent Hires (Last 30 days): {metrics.recentHires}</p> */}
          <p>Recent Hires (Last 5 years): {metrics.recentHires}</p>
        </div>
      </div>
      <div className="common-width-container dashboard-charts">
        <div className="chart-section">
          <h3>Department Distribution</h3>
          <DepartmentDistributionChart distributionData={metrics.departmentDistribution} />
        </div>
        <div className="chart-section">
          <h3>Gender Distribution</h3>
          <GenderDistributionChart genderData={metrics.genderDistribution} />
        </div>
        {/* <div className="chart-section">
          <h3>Salary Over Time</h3>
          <SalaryGrowthComponent />
        </div> */}
      </div>
    </div>
  );
}

export default Dashboard;


