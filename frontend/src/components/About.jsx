import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import aboutImage from "../assets/small baby.jpeg";
import "./About.css";
import MpesaPaymentModal from "./MpesaPaymentModal.jsx";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

function About() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [aboutData, setAboutData] = useState({
    mission: "Shareserve International is a mission driven organization working in rural kenya to address enronmental degradation and economic vulnerability through youth empowerment and sustainable solutions.",
    vision: "To raise and equip 100,000 + young environmental champions through education, tree growing and community driven environmental action.",
    history: "A greener, more environmental kenya led by younger resilient champions."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ABOUT);
      setAboutData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch about data:", error);
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" id="about">
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <div className="about-content">
            <h3 className="mb-4" style={{ color: "#198754" }}>About Us</h3>
            <p className="lead mb-4">
              Shareserve International is a mission driven organization working in rural kenya to address enronmental degradation and economic vulnerability
              through youth empowerment and sustainable solutions.
            </p>
            
          </div>
        </Col>
        <Col md={6}>
          <div className="about-image">
            <img 
              src={aboutImage} 
              alt="ShareServe community development and empowerment" 
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
        </Col>
      </Row>

      <MpesaPaymentModal 
        show={showPaymentModal} 
        onHide={() => setShowPaymentModal(false)} 
      />
    </Container>
  );
}

export default About;
