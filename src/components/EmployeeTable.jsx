import React from 'react';
// Link for client-side navigation; used to send the user to the edit page.
import { Link } from 'react-router-dom';

// Presentational ("dumb") component — it only renders what it receives via props
// and calls callbacks for user actions. It owns no state of its own and doesn't
// access context. This makes it easy to reuse in both HomePage and AllEmployeesPage.
// Props:
//   employees — array of employee objects to display
//   onDelete  — function called with an employee's id when Delete is clicked
function EmployeeTable({ employees, onDelete }) {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th>Start Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* .map() transforms the employees array into an array of <tr> JSX elements.
            The `key` prop must be unique per sibling — React uses it internally to
            identify which rows changed, were added, or were removed between renders,
            so it only updates those rows instead of re-rendering the whole table.
            We use the stable employee id rather than the array index: if rows are
            deleted or reordered, index-based keys cause subtle rendering bugs. */}
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>{emp.role}</td>
            <td>{emp.startDate}</td>
            <td className="actions">
              {/* Template literal builds the edit URL dynamically for each employee.
                  React Router matches "/edit/42" against the "/edit/:id" route. */}
              <Link to={`/edit/${emp.id}`} className="btn btn-sm btn-edit">
                Edit
              </Link>

              {/* Arrow function in onClick: without the wrapper, onDelete(emp.id) would
                  be called immediately during render (as the return value of the call),
                  not when the button is clicked. The arrow function defers execution. */}
              <button
                className="btn btn-sm btn-delete"
                onClick={() => onDelete(emp.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
