import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="gradient-card home-card">
      <h2>Welcome to RJ's Portfolio</h2>

      <p>
        I’m an emerging software engineer committed to continuous learning, building meaningful solutions, and applying technology to solve real-world challenges. My mission is to grow through innovation and create applications that deliver real value.
      </p>

      <Link to="/about" className="home-btn">Learn More About Me</Link>
    </div>
  );
}
