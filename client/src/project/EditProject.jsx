import React, { useState, useEffect } from "react";
import { read, update } from "../project/api-project";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: "",
    role: "",
    description: "",
    error: "",
    updated: false,
  });

  useEffect(() => {
    read(projectId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          title: data.title,
          role: data.role,
          description: data.description,
          error: "",
        });
      }
    });
  }, [projectId]);

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

    update(projectId, project).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, updated: true });
        navigate("/projects");
      }
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Edit Project</h1>

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
          Save Changes
        </button>

        {values.error && <p className="error-message">{values.error}</p>}
      </div>
    </div>
  );
}
