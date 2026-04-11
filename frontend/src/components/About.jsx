import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import aboutImage from "../assets/livelihood.jpg";
import "./About.css";
import MpesaPaymentModal from "./MpesaPaymentModal.jsx";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

function About() {
  const [showModal, setShowModal] = useState(false);
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

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
            
            <div className="mt-4 mb-3">
              <Button variant="success" className="btn-lg px-4" onClick={handleShowModal}>
                Learn More
              </Button>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="about-image">
            <img 
              src={aboutImage} 
              alt="ShareServe community development and empowerment" 
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />
          </div>
        </Col>
      </Row>

      {/* About Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#198754" }}>About us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            {/* Mission Section */}
            <Row className="mb-4">
              <Col md={12}>
                <Card className="mission-card">
                  <Card.Body className="p-4">
                    <h3 className="text-center mb-3" style={{ color: "#198754" }}>Our Mission</h3>
                    <p className="text-center">
                      {aboutData.mission || "To raise and equip 100,000 + young environmental champions through education, tree growing and community driven environmental action."}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Vision Section */}
            <Row className="mb-4">
              <Col md={12}>
                <Card className="vision-card">
                  <Card.Body className="p-4">
                    <h3 className="text-center mb-3" style={{ color: "#198754" }}>Our Vision</h3>
                    <p className="text-center">
                      {aboutData.vision || "A greener, more environmental kenya led by younger resilient champions."}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Focus Areas & Impact */}
            <Row className="mb-4">
              <Col md={6}>
                <Card className="focus-card h-100">
                  <Card.Body className="p-3">
                    <h4 className="mb-3" style={{ color: "#198754" }}>What We do</h4>
                   <p>We equip young learners with practical environmentals while supporting rural communities with sustainable livelihoods.</p>
                   
      
                  </Card.Body>
                </Card>
              </Col>
             <Col md={6}>
                <Card className="impact-card h-100">
                  <Card.Body className="p-3">
                    <h4 className="mb-3" style={{ color: "#198754" }}>Focus Areas</h4>
                    <ul>
                      <li>School Environmental Clubs</li>
                      <li>Indegenous & fruit tree growing</li>
                      <li>Climate Change Education</li>
                      <li>Community Restoration Projects</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Values Section */}
            {/*w className="mb-4">
              <Col md={12}>
                <h3 className="text-center mb-3" style={{ color: "#198754" }}>Our Values</h3>
                <Row className="g-3">
                  <Col md={4}>
                    <Card className="value-card text-center h-100">
                      <Card.Body>
                        <div className="value-icon mb-2">👤</div>
                        <h5>Dignity</h5>
                        <p>We honor the inherent worth of every individual, treating all people with respect and compassion regardless of their circumstances.</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="value-card text-center h-100">
                      <Card.Body>
                        <div className="value-icon mb-2">❤️</div>
                        <h5>Empathy</h5>
                        <p>We seek to understand and share the feelings of those we serve, building connections based on genuine care and mutual understanding.</p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="value-card text-center h-100">
                      <Card.Body>
                        <div className="value-icon mb-2">🤝</div>
                        <h5>Integrity</h5>
                        <p>We operate with transparency and accountability in all our programs, ensuring trust and ethical conduct in everything we do.</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>*/}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" style={{backgroundColor:'#FA8000'}} onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="success" onClick={() => setShowPaymentModal(true)}>
            Donate Now
          </Button>
        </Modal.Footer>
      </Modal>

      <MpesaPaymentModal 
        show={showPaymentModal} 
        onHide={() => setShowPaymentModal(false)} 
      />
    </Container>
  );
}

export default About;
