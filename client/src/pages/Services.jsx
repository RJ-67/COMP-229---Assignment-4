import webDev from "../assets/webdev.jpg";
import programs from "../assets/programs.png";
import gameDev from "../assets/gamedev.png";

export default function Services() {
  return (
    <div className="page-container">
      <h2 className="page-title">My Services</h2>

      <div className="services-grid">

        <div className="service-card glass-card">
          <img src={webDev} alt="Web Development" />
          <h2>Web Development</h2>
          <p>
            I create responsive, user-friendly websites using modern
            technologies such as HTML, CSS, JavaScript, and React.
          </p>
        </div>

        <div className="service-card glass-card">
          <img src={programs} alt="General Programming" />
          <h2>General Programming</h2>
          <p>
            Experienced in solving problems and building programs in Java,
            Python, and C# to address real-world challenges.
          </p>
        </div>

        <div className="service-card glass-card">
          <img src={gameDev} alt="Game Development" />
          <h2>Game Development</h2>
          <p>
            Aspiring game developer learning to design and build interactive
            games using Unity, C#, and JavaScript game libraries.
          </p>
        </div>

      </div>
    </div>
  );
}
