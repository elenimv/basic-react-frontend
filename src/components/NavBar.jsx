import React from 'react';
// Link renders a proper <a> tag but intercepts the click so React Router
// handles the navigation client-side — no full page reload occurs.
import { Link } from 'react-router-dom';

// Props with default values: if the parent doesn't pass showHome or showAdd,
// they default to true. This lets each page hide buttons that don't make sense
// (e.g. hide "Home" when you're already on the home page).
function NavBar({ showHome = true, showAdd = true }) {
  return (
    <nav className="navbar">
      {/* Conditional rendering with &&: if showHome is false the element is skipped entirely */}
      {showHome && <Link to="/" className="btn btn-secondary">Home</Link>}
      {showAdd && <Link to="/add" className="btn btn-primary">+ Add Employee</Link>}
    </nav>
  );
}

export default NavBar;
