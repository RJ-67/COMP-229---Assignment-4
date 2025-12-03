import headshot from "../assets/headshot.jpg";
import resume from "../assets/resume.pdf";

export default function About() {
  return (
    <div className="about-section">
      <div className="about-card gradient-card">

        <h2 className="about-title">About Me</h2>

        <div className="about-content">
          <img src={headshot} alt="RJ" className="about-image" />

          <div className="about-text">
            <h3>Ron Joshua Concepcion</h3>
            <p>
              I'm an aspiring software engineer passionate about coding,
              learning, and building applications that solve real-world
              problems. I'm currently working on improving my skills in
              front-end and back-end technologies, and I’m excited to contribute
              to innovative projects in the future.
            </p>

            <a href={resume} target="_blank" rel="noreferrer">
              <button className="resume-btn">View My Resume (PDF)</button>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
