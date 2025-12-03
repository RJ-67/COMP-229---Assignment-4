import React, { useState, useContext } from "react";
import { signin } from "../api-auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email: values.email, password: values.password };
    const data = await signin(user);

    if (data.error) {
      setValues({ ...values, error: data.error });
    } else {
      login(data, () => navigate("/"));
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Sign In</h1>

      <form className="form-container" onSubmit={handleSubmit}>
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

        <button className="form-btn">Sign In</button>

        {values.error && <p className="error-message">{values.error}</p>}
      </form>
    </div>
  );
}
