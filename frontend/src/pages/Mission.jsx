import { Container } from "react-bootstrap";
import "./Mission.css";
import carousel3Image from "../assets/carousel3.jpeg";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";

function Mission() {
  return (
    <>
      <NavbarComponent />
      <div className="mission-page-grid" style={{ marginTop: '80px' }}>
      <div className="mission-content-left">
        <Container>
          <div className="mission-content">
            <h1 className="mission-title">Our Mission</h1>
            <p className="mission-description">
              Shareserve International is a mission driven organization working in rural Kenya to address environmental degradation and economic vulnerability through youth empowerment and sustainable solutions.
            </p>
          </div>
        </Container>
      </div>
      <div className="mission-image-right">
        <img src={carousel3Image} alt="Environmental Mission" />
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Mission;
