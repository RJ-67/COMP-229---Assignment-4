import React, { useState } from "react";
import { create } from "../project/api-project";

export default function AddProject() {
  const [values, setValues] = useState({
    title: "",
    role: "",
    description: "",
    error: "",
    success: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    const project = {
      title: values.title,
      role: values.role,
      description: values.description,
    };

    create(project).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          title: "",
          role: "",
          description: "",
          error: "",
          success: true,
        });
      }
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Add Project</h1>

      <div className="form-container">
        <label>Project Title</label>
        <input
          value={values.title}
          onChange={handleChange("title")}
          placeholder="Project Title"
        />

        <label>Role</label>
        <input
          value={values.role}
          onChange={handleChange("role")}
          placeholder="Role (e.g., Developer)"
        />

        <label>Description</label>
        <textarea
          value={values.description}
          onChange={handleChange("description")}
          placeholder="Write something about your project..."
        />

        <button className="form-btn" onClick={clickSubmit}>
          Add Project
        </button>

        {values.success && (
          <p className="success-message">✔ Project Added!</p>
        )}
        {values.error && (
          <p className="error-message">{values.error}</p>
        )}
      </div>
    </div>
  );
}
