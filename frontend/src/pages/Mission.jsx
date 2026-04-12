import { Container } from "react-bootstrap";
import "./Mission.css";
import carousel3Image from "../assets/carousel3.jpeg";

function Mission() {
  return (
    <div className="mission-page-grid">
      <div className="mission-content-left">
        <Container>
          <div className="mission-content">
            <h1 className="mission-title">Our Mission</h1>
            <p className="mission-description">
              Shareserve International is a mission driven organization working in rural Kenya to address environmental degradation and economic vulnerability through youth empowerment and sustainable solutions.
            </p>
            <hr className="my-4" />
            <h3 className="mission-subtitle">What We Do</h3>
            <p className="mission-text">
              We equip young learners with practical environmental skills while supporting rural communities with sustainable livelihoods.
            </p>
            <ul className="mission-list">
              <li>🌱 School Environmental Clubs</li>
              <li>🌳 Indigenous & Fruit Tree Growing</li>
              <li>🌍 Climate Change Education</li>
              <li>🤝 Community Restoration Projects</li>
            </ul>
          </div>
        </Container>
      </div>
      <div className="mission-image-right">
        <img src={carousel3Image} alt="Environmental Mission" />
      </div>
    </div>
  );
}

export default Mission;
