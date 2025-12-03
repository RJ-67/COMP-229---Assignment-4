import React, { useEffect, useState } from "react";
import { list, remove } from "../contact/api-contact";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await list();
      if (!response.error) {
        setMessages(response);
      }
    };
    fetchMessages();
  }, []);

  // FORMAT PHONE NUMBER (###) ###-####
  const formatPhone = (phone) => {
    if (!phone) return "";
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  };

  const handleDelete = async (id) => {
    const response = await remove(id);
    if (!response.error) {
      setMessages(messages.filter((msg) => msg._id !== id));
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Messages</h2>

      {messages.map((msg) => (
        <div key={msg._id} className="glass-card" style={{ textAlign: "left" }}>
          <h2>
            {msg.firstname} {msg.lastname}
          </h2>

          <p>
            <strong>Email:</strong> {msg.email}
          </p>

          <p>
            <strong>Phone:</strong> {formatPhone(msg.contactNumber)}
          </p>

          <p>
            <strong>Message:</strong> {msg.message}
          </p>

          <button
            className="delete-btn"
            onClick={() => handleDelete(msg._id)}
            style={{
              marginTop: "15px",
              padding: "10px 25px",
              fontSize: "18px",
              background: "red",
              color: "white",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
