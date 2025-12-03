import React, { useEffect, useState } from "react";
import { list, remove } from "../qualification/api-qualification";
import { useNavigate } from "react-router-dom";

export default function Education() {
  const [education, setEducation] = useState([]);
  const navigate = useNavigate();

  const loadEducation = () => {
    list().then((data) => {
      if (!data.error) setEducation(data);
    });
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const deleteEdu = (id) => {
    remove(id).then(() => loadEducation());
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Education</h1>

      <button className="add-btn" onClick={() => navigate("/education/add")}>
        + Add Education
      </button>

      {education.length === 0 && (
        <p style={{ marginTop: "20px", opacity: 0.7 }}>
          No education entries yet.
        </p>
      )}

      <div className="project-grid">
        {education.map((edu) => (
          <div className="project-card" key={edu._id}>
            <h3 className="project-title">{edu.school}</h3>
            <p className="project-role">{edu.program}</p>
            <p className="project-description">{edu.year}</p>

            <div className="button-row">
              <button
                className="btn-edit"
                onClick={() => navigate(`/education/edit/${edu._id}`)}
              >
                Edit
              </button>

              <button
                className="btn-delete"
                onClick={() => deleteEdu(edu._id)}
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


