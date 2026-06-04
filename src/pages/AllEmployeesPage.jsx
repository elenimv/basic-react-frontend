import React from 'react';
import NavBar from '../components/NavBar';
import EmployeeTable from '../components/EmployeeTable';

// This page shows every employee with no slice limit.
// It receives the same props as HomePage so both pages stay in sync with
// the single source of truth held in App.js.
function AllEmployeesPage({ employees, onDelete }) {
  return (
    <div className="page">
      {/* Both Home and Add Employee buttons are shown here (NavBar defaults) */}
      <NavBar />

      <h1>All Employees</h1>
      <p className="subtitle">
        {employees.length} employee{employees.length !== 1 ? 's' : ''}
      </p>

      {employees.length === 0 ? (
        <p className="empty-state">No employees yet.</p>
      ) : (
        // Pass the full unsliced array — no PREVIEW_COUNT limit here.
        <EmployeeTable employees={employees} onDelete={onDelete} />
      )}
    </div>
  );
}

export default AllEmployeesPage;
