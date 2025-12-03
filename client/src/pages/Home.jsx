import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="gradient-card home-card">
      <h2>Welcome to My Portfolio</h2>

      <p>
        I'm an aspiring software engineer passionate about learning, building,
        and solving real-world problems through code. My mission is to grow as
        a developer and create innovative applications that make a difference.
      </p>

      <Link to="/about" className="home-btn">Learn More About Me</Link>
    </div>
  );
}
