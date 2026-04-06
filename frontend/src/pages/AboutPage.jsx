import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import aboutImage from "../assets/livelihood.jpg";
import "./AboutPage.css";
import MpesaPaymentModal from "../components/MpesaPaymentModal.jsx";

function AboutPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  return (
    <>
      <div className="about-page">
      <Container className="py-5">
        {/* Hero Section */}
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <div className="about-content">
              <h1 className="mb-4" style={{ color: "#198754" }}>About ShareServe International</h1>
              <p className="lead mb-4">
                Founded in 2009, ShareServe International is a non-profit organization dedicated to creating 
                sustainable change in communities across Kenya and beyond. We believe in the power of 
                community-driven development and the dignity of every individual.
              </p>
              <Link to="/" className="btn btn-outline-primary">
                ← Back to Home
              </Link>
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

        {/* Mission Section */}
        <Row className="mb-5">
          <Col md={12}>
            <Card className="mission-card">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4" style={{ color: "#198754" }}>Our Mission</h2>
                <p className="lead text-center">
                  To create sustainable, community-led solutions that empower individuals and families 
                  to break the cycle of poverty through education, healthcare, and economic opportunity.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Vision Section */}
        <Row className="mb-5">
          <Col md={12}>
            <Card className="vision-card">
              <Card.Body className="p-5">
                <h2 className="text-center mb-4" style={{ color: "#198754" }}>Our Vision</h2>
                <p className="lead text-center">
                  A world where every community has the resources, knowledge, and opportunity to thrive 
                  independently, creating a dignified, empowered society free from poverty and dependency.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Focus Areas & Impact */}
        <Row className="mb-5">
          <Col md={6}>
            <Card className="focus-card h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4" style={{ color: "#198754" }}>🎯 Focus Areas</h4>
                <ul>
                  <li>Quality Education</li>
                  <li>Healthcare Access</li>
                  <li>Economic Empowerment</li>
                  <li>Community Development</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="impact-card h-100">
              <Card.Body className="p-4">
                <h4 className="mb-4" style={{ color: "#198754" }}>🌍 Impact</h4>
                <ul>
                  <li>50+ Communities</li>
                  <li>10,000+ Beneficiaries</li>
                  <li>15+ Years Service</li>
                  <li>100+ Local Partners</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Values Section */}
        <Row className="mb-5">
          <Col md={12}>
            <div className="values-section">
              <h2 className="text-center mb-4" style={{ color: "#198754" }}>Our Values</h2>
              <Row className="g-4">
                <Col md={4}>
                  <Card className="value-card text-center h-100">
                    <Card.Body>
                      <div className="value-icon mb-3">👤</div>
                      <h5>Dignity</h5>
                      <p>We honor the inherent worth of every individual, treating all people with respect and compassion regardless of their circumstances.</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="value-card text-center h-100">
                    <Card.Body>
                      <div className="value-icon mb-3">❤️</div>
                      <h5>Empathy</h5>
                      <p>We seek to understand and share the feelings of those we serve, building connections based on genuine care and mutual understanding.</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="value-card text-center h-100">
                    <Card.Body>
                      <div className="value-icon mb-3">🤝</div>
                      <h5>Integrity</h5>
                      <p>We operate with transparency and accountability in all our programs, ensuring trust and ethical conduct in everything we do.</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Call to Action */}
        <Row className="text-center">
          <Col md={12}>
            <Card className="cta-card">
              <Card.Body className="p-5">
                <h2 className="mb-4" style={{ color: "#198754" }}>Get Involved</h2>
                <p className="lead mb-4">
                  Join us in our mission to create sustainable change in communities across Kenya.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="success" size="lg" className="me-2" onClick={() => setShowPaymentModal(true)}>
                    🤝 Donate Now
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    📧 Contact Us
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

    <MpesaPaymentModal 
      show={showPaymentModal} 
      onHide={() => setShowPaymentModal(false)} 
    />
    </>
  );
}

export default AboutPage;
