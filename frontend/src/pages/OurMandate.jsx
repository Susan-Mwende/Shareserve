import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import "./OurMandate.css";

function OurMandate() {
  const [mandateData, setMandateData] = useState({
    mandate: "Raising Environmental Champions who will provide transformative leadership in climate action, advocating for protection, conservation, restoration and regeneration of our Ecosystems.",
    vision: "A world where empowered communities live in harmony with nature, leading climate action that sustains livelihoods, protects ecosystems, and inspires future generations to thrive.",
    values: [
      "Environmental Stewardship: We are committed to protecting and restoring our natural environment through sustainable practices and conservation efforts.",
      "Community Empowerment: We believe in empowering local communities with knowledge, resources, and opportunities for sustainable development.",
      "Climate Action: We actively work to mitigate climate change impacts and promote adaptation strategies for vulnerable communities.",
      "Integrity: We operate with transparency, accountability, and ethical standards in all our programs and partnerships.",
      "Innovation: We embrace innovative solutions and technologies to address environmental and development challenges."
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMandateData();
  }, []);

  const fetchMandateData = async () => {
    try {
      // For now, use static data
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch mandate data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h2>Loading...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5" id="our-mandate">
      <Row className="mb-5">
        <Col md={12}>
          <div className="mandate-header text-center mb-5">
            <h1 className="display-4" style={{ color: "#198754", fontWeight: "bold" }}>
              Our Mandate
            </h1>
            <p className="lead text-muted">
              The core principles and commitments that guide our environmental mission
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card className="mandate-card">
            <Card.Body>
              <Card.Title as="h3" style={{ color: "#F08000CC" }}>
                Our Mandate
              </Card.Title>
              <Card.Text>
                {mandateData.mandate}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card className="mandate-card">
            <Card.Body>
              <Card.Title as="h3" style={{ color: "#F08000CC" }}>
                Vision Statement
              </Card.Title>
              <Card.Text>
                {mandateData.vision}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <div className="mandate-header text-center mb-4">
            <h2 style={{ color: "#198754", fontWeight: "bold" }}>
              Our Values
            </h2>
            <p className="lead text-muted">
              The principles that guide our actions and decisions
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        {mandateData.values.map((value, index) => (
          <Col md={6} lg={4} className="mb-4" key={index}>
            <Card className="value-card h-100">
              <Card.Body>
                <Card.Title as="h5" style={{ color: "#F08000CC" }}>
                  {value.split(':')[0]}
                </Card.Title>
                <Card.Text>
                  {value.split(':')[1]}
                </Card.Text>
              </Card.Body>
            </Card>
        ))}
      </Row>
    </Container>
  );
}

export default OurMandate;
