// React is the core library. useState and useEffect are "hooks" —
// functions that let functional components tap into React features.
import React, { useState, useEffect } from 'react';

// BrowserRouter wraps the app and enables URL-based navigation.
// Routes is the container that picks which Route to render.
// Route maps a URL path to a component.
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AllEmployeesPage from './pages/AllEmployeesPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import './App.css';

// Seed data used the very first time the app loads (nothing in localStorage yet).
const SEED_EMPLOYEES = [
  { id: 1, name: 'Alice Johnson',  email: 'alice@company.com',  department: 'Engineering', role: 'Senior Developer',    startDate: '2021-03-15' },
  { id: 2, name: 'Bob Smith',      email: 'bob@company.com',    department: 'Marketing',   role: 'Marketing Manager',   startDate: '2020-07-01' },
  { id: 3, name: 'Carol White',    email: 'carol@company.com',  department: 'HR',          role: 'HR Specialist',       startDate: '2022-01-10' },
  { id: 4, name: 'David Brown',    email: 'david@company.com',  department: 'Engineering', role: 'Frontend Developer',  startDate: '2023-05-20' },
  { id: 5, name: 'Eva Martinez',   email: 'eva@company.com',    department: 'Finance',     role: 'Financial Analyst',   startDate: '2019-11-08' },
  { id: 6, name: 'Frank Lee',      email: 'frank@company.com',  department: 'Engineering', role: 'Backend Developer',   startDate: '2022-09-14' },
  { id: 7, name: 'Grace Kim',      email: 'grace@company.com',  department: 'Design',      role: 'UX Designer',         startDate: '2021-06-30' },
  { id: 8, name: 'Henry Davis',    email: 'henry@company.com',  department: 'Sales',       role: 'Sales Executive',     startDate: '2023-02-01' },
];

function App() {
  // useState(initialValue) returns [currentValue, setterFunction].
  // The initializer here is a function (lazy initialisation) — React calls it only
  // on the very first render, making it efficient to read from localStorage.
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : SEED_EMPLOYEES;
  });

  // useEffect(callback, [dependencies]) runs the callback after every render
  // where one of the dependencies changed. Here, whenever `employees` updates
  // we write the new value to localStorage so it survives page refreshes.
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // ── State-mutating handlers ────────────────────────────────────────────────
  // These are defined here (at the top of the component tree) and passed down
  // as props — the "lifting state up" pattern. Child components never modify
  // state directly; they call these handlers instead.

  const addEmployee = (data) => {
    // Date.now() gives a simple unique numeric id.
    const newEmployee = { ...data, id: Date.now() };
    // Functional update: prev => ... guarantees we're working from the latest
    // state even if multiple updates are batched together.
    setEmployees(prev => [...prev, newEmployee]);
  };

  const editEmployee = (id, data) => {
    // .map() returns a NEW array (never mutate state directly).
    // React detects the new reference and re-renders affected components.
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, ...data } : emp)
    );
  };

  const deleteEmployee = (id) => {
    // .filter() also returns a new array, excluding the deleted employee.
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // JSX: the HTML-like syntax that React transforms into createElement() calls.
  // BrowserRouter must wrap everything that needs routing.
  // Each Route's `element` prop receives a JSX element (not a component reference),
  // which lets us pass props directly to the page components.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<HomePage        employees={employees} onDelete={deleteEmployee} />} />
        <Route path="/employees" element={<AllEmployeesPage employees={employees} onDelete={deleteEmployee} />} />
        <Route path="/add"       element={<AddEmployeePage  onAdd={addEmployee} />} />
        <Route path="/edit/:id"  element={<EditEmployeePage employees={employees} onEdit={editEmployee} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
