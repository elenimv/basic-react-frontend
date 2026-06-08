import React from 'react';
import NavBar from '../components/NavBar';
import EmployeeForm from '../components/EmployeeForm';
// useEmployees gives this page access to the shared addEmployee handler
// without it needing to be passed as a prop from App.
import { useEmployees } from '../context/EmployeeContext';

function AddEmployeePage() {
  // Pull only addEmployee from context — that's all this page needs.
  const { addEmployee } = useEmployees();

  return (
    <div className="page">
      {/* Hide the Add Employee button since we're already on this page */}
      <NavBar showAdd={false} />
      <h1>Add Employee</h1>
      {/* No initialData prop means EmployeeForm starts with empty fields (add mode).
          onSubmit is wired directly to addEmployee from context. */}
      <EmployeeForm onSubmit={addEmployee} submitLabel="Add Employee" />
    </div>
  );
}

export default AddEmployeePage;
