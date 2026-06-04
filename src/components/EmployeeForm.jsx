import React, { useState, useEffect } from 'react';
// useNavigate returns a function that changes the URL programmatically
// (as opposed to Link, which the user clicks).
import { useNavigate } from 'react-router-dom';

// Reusable controlled form used by both AddEmployeePage and EditEmployeePage.
// Props:
//   initialData  — employee object to pre-fill the form (edit mode); undefined for add mode
//   onSubmit     — called with the form data object when the user saves
//   submitLabel  — text on the submit button (defaults to 'Save')
function EmployeeForm({ initialData, onSubmit, submitLabel = 'Save' }) {
  // Controlled inputs pattern: React state is the single source of truth for
  // every field. The DOM input's value is always set FROM state, and every
  // keystroke updates state via onChange — the DOM never holds the real value.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    startDate: '',
  });

  // When initialData is provided (edit mode), populate the form fields.
  // The dependency array [initialData] means this effect re-runs if the prop changes,
  // keeping the form in sync if the parent re-renders with a different employee.
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
  // lets us update the right field dynamically without a separate handler per field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // e.preventDefault() stops the browser's default form submission behaviour
  // (which would send a GET/POST request and reload the page).
  // We handle submission ourselves: call the parent's onSubmit, then navigate away.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/');
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        {/* value ties the input to React state; onChange keeps them in sync */}
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
            navigate(-1) goes back one step in the browser history — like the back button. */}
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </div>
    </form>
  );
}

export default EmployeeForm;
