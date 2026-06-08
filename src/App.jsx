import React from 'react';

// BrowserRouter wraps the app and enables URL-based navigation using the
// browser's History API (no full page reloads).
// Routes is the container that looks at the current URL and renders the
// first Route whose path matches.
// Route maps a URL path to a component.
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// EmployeeProvider is the Context Provider — it wraps the entire app so
// every page and component can access shared state via useEmployees()
// without props being threaded through each level of the tree.
import { EmployeeProvider } from './context/EmployeeContext';

import HomePage from './pages/HomePage';
import AllEmployeesPage from './pages/AllEmployeesPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import './App.css';

function App() {
  // EmployeeProvider must sit above BrowserRouter (and all routes) so that
  // page components rendered by the router can still call useEmployees().
  // Context works by looking UP the component tree for the nearest Provider —
  // if a component were rendered outside the Provider it would receive null.
  return (
    <EmployeeProvider>
      <BrowserRouter>
        {/* Routes inspects the URL and renders the first matching Route.
            Because state lives in context, no props need to be passed here —
            each page component pulls exactly what it needs via useEmployees(). */}
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/employees" element={<AllEmployeesPage />} />
          <Route path="/add"       element={<AddEmployeePage />} />
          {/* :id is a URL parameter — React Router captures whatever is in
              that segment of the URL and makes it available via useParams(). */}
          <Route path="/edit/:id"  element={<EditEmployeePage />} />
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;
