import React, { useState } from "react";
import { signup } from "../api-auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const data = await signup(user);

    if (data.error) {
      setValues({ ...values, error: data.error });
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Create an Account</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Full Name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          placeholder="Email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          placeholder="Password"
          required
        />

        <button className="form-btn">Sign Up</button>

        {values.error && <p className="error-message">{values.error}</p>}
      </form>
    </div>
  );
}
