// createContext creates a Context object. When React renders a component that
// subscribes to this context, it reads the current value from the nearest matching
// Provider above it in the tree.
// useContext is the hook that lets any component read the context value.
// useState manages the employees array as local state inside the provider.
import React, { createContext, useContext, useState } from 'react';

// Seed data used when the app first loads (no persisted data yet).
// Defined outside the component so it's created once, not on every render.
const SEED_EMPLOYEES = [
  { id: 1, name: 'Alice Johnson',  email: 'alice@company.com',  department: 'Engineering', role: 'Senior Developer',   startDate: '2021-03-15' },
  { id: 2, name: 'Bob Smith',      email: 'bob@company.com',    department: 'Marketing',   role: 'Marketing Manager',  startDate: '2020-07-01' },
  { id: 3, name: 'Carol White',    email: 'carol@company.com',  department: 'HR',          role: 'HR Specialist',      startDate: '2022-01-10' },
  { id: 4, name: 'David Brown',    email: 'david@company.com',  department: 'Engineering', role: 'Frontend Developer', startDate: '2023-05-20' },
  { id: 5, name: 'Eva Martinez',   email: 'eva@company.com',    department: 'Finance',     role: 'Financial Analyst',  startDate: '2019-11-08' },
  { id: 6, name: 'Frank Lee',      email: 'frank@company.com',  department: 'Engineering', role: 'Backend Developer',  startDate: '2022-09-14' },
  { id: 7, name: 'Grace Kim',      email: 'grace@company.com',  department: 'Design',      role: 'UX Designer',        startDate: '2021-06-30' },
  { id: 8, name: 'Henry Davis',    email: 'henry@company.com',  department: 'Sales',       role: 'Sales Executive',    startDate: '2023-02-01' },
];

// createContext(defaultValue) returns a Context object with two key pieces:
//   - Context.Provider  — a component that "broadcasts" a value to its subtree
//   - useContext(Context) — the hook consumers call to read that value
// The defaultValue (null here) only applies when a component reads context
// without a matching Provider above it. In practice that shouldn't happen —
// every consumer in this app is inside EmployeeProvider.
const EmployeeContext = createContext(null);

// EmployeeProvider is a regular React component that wraps part of the tree.
// Any descendant — no matter how deeply nested — can read the value it provides
// by calling useEmployees(), without props being passed through every level.
export function EmployeeProvider({ children }) {
  // useState returns [currentValue, setter]. The state lives inside this
  // provider component, so it persists as long as the provider is mounted.
  // All consumers share this single piece of state — no duplication.
  const [employees, setEmployees] = useState(SEED_EMPLOYEES);

  // ── State-mutating handlers ────────────────────────────────────────────────
  // These functions are defined here and exposed through context so any consumer
  // can trigger a state update without needing the setter passed as a prop.

  const addEmployee = (data) => {
    // Functional update (prev => ...) guarantees we work from the latest state
    // even if multiple updates are batched together by React.
    // Date.now() produces a simple unique numeric id.
    setEmployees(prev => [...prev, { ...data, id: Date.now() }]);
  };

  const editEmployee = (id, data) => {
    // .map() returns a NEW array (never mutate state in place — React won't
    // detect the change and won't re-render if the same array reference is reused).
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, ...data } : emp)
    );
  };

  const deleteEmployee = (id) => {
    // .filter() also returns a new array, excluding the deleted employee.
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  // The Provider's `value` prop is what consumers receive when they call
  // useContext(EmployeeContext). We expose both the data and the handlers so
  // consumers can read and mutate state without knowing where it lives.
  // Any time this value changes (i.e. employees updates), React re-renders
  // every component that is currently subscribed to this context.
  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, editEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

// Custom hook — a plain function whose name starts with "use" that calls
// one or more built-in hooks internally. Wrapping useContext here means:
//   1. Consumers import one name (useEmployees) instead of two (useContext + EmployeeContext).
//   2. If the context shape changes later, we update only this file.
export function useEmployees() {
  return useContext(EmployeeContext);
}
