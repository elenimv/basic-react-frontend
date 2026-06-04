import React from 'react';
// Link is used for the "View All" button at the bottom of the preview table.
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import EmployeeTable from '../components/EmployeeTable';

// Only this many employees are shown on the home page preview.
const PREVIEW_COUNT = 5;

// Props destructuring: instead of writing `props.employees` and `props.onDelete`
// throughout the function, we unpack them directly in the parameter list.
function HomePage({ employees, onDelete }) {
  // Array.slice(0, n) returns a new array with at most n items — the original
  // `employees` array is not modified (non-destructive).
  const previewEmployees = employees.slice(0, PREVIEW_COUNT);
  const hasMore = employees.length > PREVIEW_COUNT;

  return (
    <div className="page">
      {/* showHome=false because we're already on the home page */}
      <NavBar showHome={false} />

      <h1>Employee Manager</h1>
      <p className="subtitle">
        {employees.length} total employee{employees.length !== 1 ? 's' : ''}
      </p>

      {/* Conditional rendering with a ternary: if the list is empty show a message,
          otherwise show the table. This avoids rendering an empty <table> element. */}
      {employees.length === 0 ? (
        <p className="empty-state">No employees yet. Add one to get started.</p>
      ) : (
        // React Fragment (<>...</>) groups elements without adding a real DOM node.
        // Needed here because JSX expressions must return a single root element.
        <>
          <EmployeeTable employees={previewEmployees} onDelete={onDelete} />

          {/* Only render the "View All" button when there are more rows than the preview limit */}
          {hasMore && (
            <div className="view-all-wrapper">
              <Link to="/employees" className="btn btn-outline">
                View All {employees.length} Employees
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
