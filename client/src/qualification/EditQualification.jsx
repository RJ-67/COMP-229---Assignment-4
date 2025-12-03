import React, { useState, useEffect } from "react";
import { read, update } from "../qualification/api-qualification";
import { useParams, useNavigate } from "react-router-dom";

export default function EditQualification() {
  // ✅ matches App.jsx route: /education/edit/:qualificationId
  const { qualificationId } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    school: "",
    program: "",
    year: "",
    error: "",
  });

  // ✅ Load the qualification using the correct route param
  useEffect(() => {
    read(qualificationId).then((data) => {
      if (!data.error) {
        setValues({
          school: data.school,
          program: data.program,
          year: data.year,
          error: "",
        });
      } else {
        setValues({ ...values, error: "Could not retrieve qualification" });
      }
    });
  }, [qualificationId]);

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  // ✅ Save changes using the correct ID
  const clickSubmit = () => {
    update(qualificationId, {
      school: values.school,
      program: values.program,
      year: values.year,
    }).then((res) => {
      if (!res.error) {
        navigate("/education");
      } else {
        setValues({ ...values, error: res.error });
      }
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Edit Qualification</h1>

      <div className="form-container">
        <label>School</label>
        <input
          type="text"
          value={values.school}
          onChange={handleChange("school")}
        />

        <label>Program</label>
        <input
          type="text"
          value={values.program}
          onChange={handleChange("program")}
        />

        <label>Year</label>
        <input
          type="text"
          value={values.year}
          onChange={handleChange("year")}
        />

        <button className="form-btn" onClick={clickSubmit}>
          Save Changes
        </button>

        {values.error && (
          <p className="error-message">{values.error}</p>
        )}
      </div>
    </div>
  );
}
