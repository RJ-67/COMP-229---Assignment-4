import React, { useState } from "react";
import { create } from "../contact/api-contact";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactEntry = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      contactNumber: formData.contactNumber,  
      message: formData.message,              
    };

    const response = await create(contactEntry);

    if (response.error) {
      setStatus({ success: false, error: response.error });
    } else {
      setStatus({ success: true, error: "" });

      // Clear form
      setFormData({
        firstname: "",
        lastname: "",
        contactNumber: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <div className="page-container contact-page">
      <h2 className="page-title">Contact Me</h2>

      {/* CONTACT INFO BOX */}
      <div className="contact-info-box glass-card">
        <div className="contact-info-item">
          <h2>Email</h2>
          <p>ronjoshua.c03@gmail.com</p> 
        </div>

        <div className="contact-info-item">
          <h2>Phone</h2>
          <p>(437) 328-4199</p> 
        </div>

        <div className="contact-info-item">
          <h2>GitHub</h2>
          <a href="https://github.com/RJ-67" target="_blank" rel="noreferrer">
            github.com/RJ-67
          </a>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="contact-form-box glass-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Enter your message..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="send-btn">
            Send Message
          </button>
        </form>

        {/* ERROR */}
        {status.error && (
          <p style={{ color: "red", marginTop: "10px" }}>{status.error}</p>
        )}

        {/* SUCCESS */}
        {status.success && (
          <p style={{ color: "#00e5ff", marginTop: "10px" }}>
            Message sent successfully!
          </p>
        )}
      </div>
    </div>
  );
}
