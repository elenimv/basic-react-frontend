import React from 'react';
// Link renders an <a> tag that navigates client-side (no page reload).
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import EmployeeTable from '../components/EmployeeTable';
// useEmployees is a custom hook that calls useContext(EmployeeContext) internally.
// This component subscribes to the context — React re-renders it automatically
// whenever employees changes anywhere in the app.
import { useEmployees } from '../context/EmployeeContext';

// Only this many employees are shown on the home page preview.
const PREVIEW_COUNT = 5;

// No props needed — all data comes from context via useEmployees().
function HomePage() {
  // Destructure only the values this page actually uses.
  // employees is the shared array; deleteEmployee is the mutation handler.
  const { employees, deleteEmployee } = useEmployees();

  // Array.slice(0, n) returns a new array with at most n items — the original
  // employees array is not modified (non-destructive operation).
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
        // Needed here because a JSX expression must return a single root element.
        <>
          {/* EmployeeTable is a presentational component — it only renders what
              it receives via props. deleteEmployee from context is passed as onDelete
              so the table can trigger mutations without knowing about context itself. */}
          <EmployeeTable employees={previewEmployees} onDelete={deleteEmployee} />

          {/* && short-circuit: if hasMore is false, nothing renders.
              If true, React renders the element on the right side. */}
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
