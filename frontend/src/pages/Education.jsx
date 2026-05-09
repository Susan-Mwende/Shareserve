import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import "./Education.css";

function Education() {
  const [educationData, setEducationData] = useState({
    programs: [
      {
        title: "Education Support",
        description: "Provision of education levies, uniforms, and school supplies to support vulnerable students in rural Kenya.",
        icon: "fas fa-graduation-cap",
        impact: "Supporting 500+ students annually"
      },
      {
        title: "Mentorship & Mental Health",
        description: "Comprehensive mentorship programs and mental health support for young people to help them thrive academically and personally.",
        icon: "fas fa-heart",
        impact: "200+ youth mentored"
      },
      {
        title: "School Leadership Empowerment",
        description: "Leadership training and empowerment programs for school leaders to create positive change in their communities.",
        icon: "fas fa-users",
        impact: "50+ school leaders trained"
      }
    ],
    initiatives: [
      "School fee sponsorship for orphaned and vulnerable children",
      "Distribution of learning materials and textbooks",
      "Provision of school uniforms and shoes",
      "Mentorship pairing with professionals",
      "Counseling and mental health workshops",
      "Leadership development camps"
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    try {
      // For now, use static data
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch education data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h2>Loading Education Programs...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5" id="education">
      <Row className="mb-5">
        <Col md={12}>
          <div className="education-header text-center mb-5">
            <h1 className="display-4" style={{ color: "#198754", fontWeight: "bold" }}>
              Education Programs
            </h1>
            <p className="lead text-muted">
              Empowering young minds through education, mentorship, and leadership development
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        {educationData.programs.map((program, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="education-card h-100">
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
          <Card className="initiatives-card">
            <Card.Body>
              <Card.Title as="h3" className="text-center mb-4" style={{ color: "#198754" }}>
                Our Key Initiatives
              </Card.Title>
              <Row>
                {educationData.initiatives.map((initiative, index) => (
                  <Col md={6} className="mb-3" key={index}>
                    <div className="initiative-item d-flex align-items-center p-3" style={{ 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "10px",
                      borderLeft: "4px solid #198754"
                    }}>
                      <i className="fas fa-check-circle me-3" style={{ color: "#198754", fontSize: "1.2rem" }}></i>
                      <span>{initiative}</span>
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
              <h3 className="mb-3">Support Our Education Programs</h3>
              <p className="lead mb-4">
                Help us continue empowering young minds through education and mentorship. Your support makes a difference.
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

export default Education;
