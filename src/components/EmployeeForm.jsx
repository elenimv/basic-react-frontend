// useState manages the form's field values as React state (controlled inputs pattern).
// useEffect lets us react to prop changes — specifically, re-populating the form
// when a different employee's data is passed in (edit mode).
import React, { useState, useEffect } from 'react';
// useNavigate returns a function that changes the URL programmatically
// (as opposed to Link, which the user clicks).
import { useNavigate } from 'react-router-dom';

// Reusable controlled form used by both AddEmployeePage and EditEmployeePage.
// Props:
//   initialData  — employee object to pre-fill the form (edit mode); undefined for add mode
//   onSubmit     — called with the form data object when the user saves
//   submitLabel  — text on the submit button ("Add Employee" or "Save Changes")
function EmployeeForm({ initialData, onSubmit, submitLabel = 'Save' }) {
  // Controlled inputs: React state is the single source of truth for every field.
  // The DOM input's `value` is always set FROM state, and every keystroke updates
  // state via `onChange` — the DOM never holds the real value independently.
  // This is the opposite of "uncontrolled" inputs where you'd read the DOM with a ref.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    startDate: '',
  });

  // useEffect(callback, [deps]) runs the callback after the component renders,
  // but only when one of the listed dependencies has changed since the last render.
  // Here: when initialData is provided (edit mode), copy it into formData so the
  // inputs pre-fill. The dependency [initialData] means this effect re-runs if the
  // prop changes, keeping the form in sync if the parent renders with a new employee.
  useEffect(() => {
    if (initialData) {
      setFormData({
        name:       initialData.name       || '',
        email:      initialData.email      || '',
        department: initialData.department || '',
        role:       initialData.role       || '',
        startDate:  initialData.startDate  || '',
      });
    }
  }, [initialData]);

  const navigate = useNavigate();

  // A single change handler works for all inputs because each input has a `name`
  // attribute matching the formData key. Computed property syntax ([e.target.name])
  // lets us update the right field dynamically without writing a separate handler
  // per field (which would be repetitive and hard to maintain).
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Spread the existing fields first, then overwrite only the one that changed.
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // e.preventDefault() stops the browser's default form submission behaviour,
  // which would send a GET/POST request and cause a full page reload.
  // We handle submission ourselves: notify the parent via onSubmit, then navigate.
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit is either addEmployee or an adapter wrapping editEmployee —
    // this component doesn't need to know which; it just passes the data up.
    onSubmit(formData);
    // navigate('/') programmatically redirects to the home page after saving.
    navigate('/');
  };

  return (
    // onSubmit on the <form> element fires when the user submits (button click
    // or pressing Enter in a field). We intercept it with handleSubmit above.
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        {/* `value` ties the input to React state; `onChange` keeps them in sync.
            Without `value`, the input would be uncontrolled and React wouldn't
            know what the user typed until we explicitly read it. */}
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Jane Smith"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="jane@company.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input
          id="department"
          name="department"
          type="text"
          value={formData.department}
          onChange={handleChange}
          required
          placeholder="Engineering"
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input
          id="role"
          name="role"
          type="text"
          value={formData.role}
          onChange={handleChange}
          required
          placeholder="Senior Developer"
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        {/* type="button" prevents this from triggering the form's onSubmit event.
            navigate(-1) goes back one step in the browser history — like pressing
            the browser's back button. */}
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
}

export default EmployeeForm;
