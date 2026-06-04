import React from 'react';
// Link for client-side navigation; used to send the user to the edit page.
import { Link } from 'react-router-dom';

// A reusable "presentational" component — it only renders what it receives via props
// and calls callbacks for user actions. It owns no state of its own.
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
            The `key` prop must be unique per item — React uses it to identify which
            rows changed, were added, or were removed, so it only re-renders those rows
            instead of the whole table. Using the stable employee id (not array index)
            prevents subtle bugs when items are reordered or deleted. */}
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>{emp.role}</td>
            <td>{emp.startDate}</td>
            <td className="actions">
              {/* Template literal builds the edit URL dynamically for each employee.
                  React Router matches this against the "/edit/:id" route in App.js. */}
              <Link to={`/edit/${emp.id}`} className="btn btn-sm btn-edit">
                Edit
              </Link>

              {/* Arrow function in onClick: without it, onDelete(emp.id) would be called
                  immediately during render rather than when the button is clicked. */}
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
