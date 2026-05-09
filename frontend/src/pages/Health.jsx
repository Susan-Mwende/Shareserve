import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import "./Health.css";

function Health() {
  const [healthData, setHealthData] = useState({
    programs: [
      {
        title: "Health & Wellness Programs",
        description: "Comprehensive health services and wellness programs for rural communities in Kenya.",
        icon: "fas fa-heartbeat",
        impact: "Serving 1000+ community members annually"
      },
      {
        title: "Maternal & Child Health",
        description: "Specialized maternal and child health services to reduce mortality rates and improve family health outcomes.",
        icon: "fas fa-baby",
        impact: "500+ mothers and children served"
      },
      {
        title: "Disease Prevention",
        description: "Health education and disease prevention programs focusing on common rural health challenges.",
        icon: "fas fa-shield-virus",
        impact: "2000+ people educated on prevention"
      }
    ],
    services: [
      "Primary healthcare services",
      "Maternal and child health clinics",
      "Health education workshops",
      "Disease prevention campaigns",
      "Nutrition programs",
      "Mental health support"
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthData();
  }, []);

  const fetchHealthData = async () => {
    try {
      // For now, use static data
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch health data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h2>Loading Health Programs...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5" id="health">
      <Row className="mb-5">
        <Col md={12}>
          <div className="health-header text-center mb-5">
            <h1 className="display-4" style={{ color: "#198754", fontWeight: "bold" }}>
              Health Programs
            </h1>
            <p className="lead text-muted">
              Promoting community health and wellness through comprehensive healthcare services
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        {healthData.programs.map((program, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="health-card h-100">
              <Card.Body className="text-center">
                <div className="program-icon mb-3">
                  <i className={program.icon} style={{ fontSize: "3rem", color: "#198754" }}></i>
                </div>
                <Card.Title as="h4" style={{ color: "#F08000CC" }}>
                  {program.title}
                </Card.Title>
                <Card.Text className="mb-3">
                  {program.description}
                </Card.Text>
                <div className="impact-badge" style={{ 
                  backgroundColor: "#198754", 
                  color: "white", 
                  padding: "0.5rem 1rem", 
                  borderRadius: "20px",
                  fontSize: "0.9rem"
                }}>
                  <i className="fas fa-chart-line me-2"></i>
                  {program.impact}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card className="services-card">
            <Card.Body>
              <Card.Title as="h3" className="text-center mb-4" style={{ color: "#198754" }}>
                Our Health Services
              </Card.Title>
              <Row>
                {healthData.services.map((service, index) => (
                  <Col md={6} className="mb-3" key={index}>
                    <div className="service-item d-flex align-items-center p-3" style={{ 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "10px",
                      borderLeft: "4px solid #198754"
                    }}>
                      <i className="fas fa-check-circle me-3" style={{ color: "#198754", fontSize: "1.2rem" }}></i>
                      <span>{service}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12} className="text-center">
          <Card className="cta-card" style={{ background: "linear-gradient(135deg, #198754 0%, #2c3e50 100%)", color: "white" }}>
            <Card.Body className="p-5">
              <h3 className="mb-3">Support Our Health Programs</h3>
              <p className="lead mb-4">
                Help us continue providing essential healthcare services to rural communities. Your support saves lives.
              </p>
              <Button variant="light" size="lg" style={{ color: "#198754", fontWeight: "bold" }}>
                <i className="fas fa-heart me-2"></i>
                Donate Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Health;
