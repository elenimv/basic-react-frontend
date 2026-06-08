import React from 'react';
import NavBar from '../components/NavBar';
import EmployeeTable from '../components/EmployeeTable';
// useEmployees is a custom hook — it calls useContext internally so this component
// doesn't need to import EmployeeContext or useContext directly.
import { useEmployees } from '../context/EmployeeContext';

function AllEmployeesPage() {
  // Destructure only the values this page actually needs from the context.
  // React re-renders this component whenever the context value changes.
  const { employees, deleteEmployee } = useEmployees();

  return (
    <div className="page">
      <NavBar />

      <h1>All Employees</h1>
      <p className="subtitle">
        {employees.length} employee{employees.length !== 1 ? 's' : ''}
      </p>

      {employees.length === 0 ? (
        <p className="empty-state">No employees yet.</p>
      ) : (
        // Pass the full unsliced array — no PREVIEW_COUNT limit here.
        // EmployeeTable is a presentational component that receives data via props;
        // it doesn't access context itself.
        <EmployeeTable employees={employees} onDelete={deleteEmployee} />
      )}
    </div>
  );
}

export default AllEmployeesPage;
