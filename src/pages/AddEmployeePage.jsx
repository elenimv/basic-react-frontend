import React from 'react';
import NavBar from '../components/NavBar';
import EmployeeForm from '../components/EmployeeForm';

// Thin wrapper page — its only job is to lay out the NavBar + heading,
// then hand the `onAdd` handler to EmployeeForm.
// No initialData prop means EmployeeForm starts with empty fields (add mode).
function AddEmployeePage({ onAdd }) {
  return (
    <div className="page">
      {/* Hide the Add Employee button since we're already on this page */}
      <NavBar showAdd={false} />
      <h1>Add Employee</h1>
      <EmployeeForm onSubmit={onAdd} submitLabel="Add Employee" />
    </div>
  );
}

export default AddEmployeePage;
