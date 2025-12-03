import React, { useEffect, useState } from "react";
import { list, remove } from "../project/api-project";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const loadProjects = () => {
    list().then((data) => {
      if (!data.error) setProjects(data);
    });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const deleteProject = (id) => {
    remove(id).then(() => loadProjects());
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Projects</h1>

      <button className="add-btn" onClick={() => navigate("/projects/add")}>
        + Add Project
      </button>

      {projects.length === 0 && (
        <p style={{ marginTop: "20px", opacity: 0.7 }}>
          No project entries yet.
        </p>
      )}

      <div className="project-grid">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-role">Role: {project.role}</p>
            <p className="project-description">{project.description}</p>

            <div className="button-row">
              <button
                className="btn-edit"
                onClick={() => navigate(`/projects/edit/${project._id}`)}
              >
                Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => deleteProject(project._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


