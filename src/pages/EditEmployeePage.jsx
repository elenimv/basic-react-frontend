import React from 'react';
// useParams reads dynamic segments from the current URL.
// Navigate is a component that immediately redirects when rendered.
import { useParams, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import EmployeeForm from '../components/EmployeeForm';
// Both employees (to look up the record) and editEmployee (to save changes)
// come from context — no prop drilling needed from App.
import { useEmployees } from '../context/EmployeeContext';

function EditEmployeePage() {
  // useParams returns an object matching the :name segments in the route path.
  // For route "/edit/:id" and URL "/edit/42", this gives { id: "42" }.
  // URL params are always strings, so we convert to Number to match our numeric ids.
  const { id } = useParams();

  // Access shared state and the edit handler from context.
  const { employees, editEmployee } = useEmployees();

  const employee = employees.find(emp => emp.id === Number(id));

  // Guard clause: if no employee matches the URL (invalid id or already deleted),
  // render <Navigate> which immediately redirects to "/" without showing anything.
  // `replace` replaces the bad URL in history so the back button doesn't return to it.
  if (!employee) {
    return <Navigate to="/" replace />;
  }

  // Adapter function: EmployeeForm calls onSubmit(data) but editEmployee needs (id, data).
  // We wrap it here so EmployeeForm stays generic and reusable across add and edit.
  const handleSubmit = (data) => {
    editEmployee(employee.id, data);
  };

  return (
    <div className="page">
      <NavBar />
      <h1>Edit Employee</h1>
      {/* Pass the found employee as initialData so the form pre-fills its fields */}
      <EmployeeForm
        initialData={employee}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}

export default EditEmployeePage;
