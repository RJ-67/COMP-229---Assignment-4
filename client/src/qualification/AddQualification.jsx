import React, { useState } from "react";
import { create } from "../qualification/api-qualification";
import { useNavigate } from "react-router-dom";

export default function AddQualification() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    school: "",
    program: "",
    year: "",
    error: "",
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const clickSubmit = () => {
    const qualification = {
      school: values.school,
      program: values.program,
      year: values.year,
    };

    create(qualification).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        navigate("/education");  // redirect after success
      }
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Add Qualification</h1>

      <div className="form-container">
        <label>School</label>
        <input
          type="text"
          placeholder="School Name"
          onChange={handleChange("school")}
        />

        <label>Program</label>
        <input
          type="text"
          placeholder="Program Name"
          onChange={handleChange("program")}
        />

        <label>Year</label>
        <input
          type="text"
          placeholder="2023–2026"
          onChange={handleChange("year")}
        />

        <button className="form-btn" onClick={clickSubmit}>
          Add Qualification
        </button>

        {values.success && (
          <p className="success-message">✔ Qualification Added!</p>
        )}

        {values.error && (
          <p className="error-message">{values.error}</p>
        )}
      </div>
    </div>
  );
}
