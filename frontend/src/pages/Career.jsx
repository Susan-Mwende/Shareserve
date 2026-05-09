import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import "./Career.css";

function Career() {
  const [careerData, setCareerData] = useState({
    positions: [
      {
        title: "Environmental Champion",
        department: "Programs",
        location: "Nairobi, Kenya",
        type: "Full-time",
        description: "Lead environmental initiatives and coordinate green activities in communities"
      },
      {
        title: "Program Coordinator",
        department: "Programs", 
        location: "Nairobi, Kenya",
        type: "Full-time",
        description: "Coordinate environmental programs and manage community partnerships"
      },
      {
        title: "Field Officer",
        department: "Operations",
        location: "Various Locations",
        type: "Full-time", 
        description: "Implement environmental projects and monitor field activities"
      },
      {
        title: "Education Officer",
        department: "Education",
        location: "Nairobi, Kenya",
        type: "Full-time",
        description: "Develop and implement environmental education programs"
      }
    ],
    benefits: [
      "Competitive salary and benefits package",
      "Professional development opportunities",
      "Chance to make real environmental impact",
      "Working with passionate environmental team",
      "Career growth and advancement opportunities"
    ]
  });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    phone: '',
    coverLetter: '',
    resume: null
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchCareerData();
  }, []);

  const fetchCareerData = async () => {
    try {
      // For now, use static data
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch career data:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would normally send to backend
      console.log('Career application submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          position: '',
          phone: '',
          coverLetter: '',
          resume: null
        });
      }, 5000);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h2>Loading Career Opportunities...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5" id="career">
      <Row className="mb-5">
        <Col md={12}>
          <div className="career-header text-center mb-5">
            <h1 className="display-4" style={{ color: "#198754", fontWeight: "bold" }}>
              Join Our Team
            </h1>
            <p className="lead text-muted">
              Be part of the environmental change in Kenya
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card className="why-join-card">
            <Card.Body>
              <Card.Title as="h3" style={{ color: "#F08000CC" }}>
                Why Work With ShareServe?
              </Card.Title>
              <Row>
                {careerData.benefits.map((benefit, index) => (
                  <Col md={6} lg={4} className="mb-3" key={index}>
                    <div className="benefit-item">
                      <h5 style={{ color: "#198754" }}>
                        ✓ {benefit}
                      </h5>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <div className="positions-header text-center mb-4">
            <h2 style={{ color: "#198754", fontWeight: "bold" }}>
              Current Openings
            </h2>
            <p className="lead text-muted">
              Join our passionate team making environmental impact
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        {careerData.positions.map((position, index) => (
          <Col md={6} lg={4} className="mb-4" key={index}>
            <Card className="position-card h-100">
              <Card.Body>
                <Card.Title as="h5" style={{ color: "#F08000CC" }}>
                  {position.title}
                </Card.Title>
                <Card.Text as="div">
                  <div className="position-details">
                    <p><strong>Department:</strong> {position.department}</p>
                    <p><strong>Location:</strong> {position.location}</p>
                    <p><strong>Type:</strong> {position.type}</p>
                    <p><strong>Description:</strong> {position.description}</p>
                  </div>
                </Card.Text>
                <Button 
                  variant="success" 
                  className="apply-btn"
                  onClick={() => setFormData(prev => ({ ...prev, position: position.title }))}
                >
                  Apply Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card className="application-form-card">
            <Card.Body>
              <Card.Title as="h3" style={{ color: "#F08000CC" }}>
                Apply for Position
              </Card.Title>
              
              {submitted && (
                <Alert variant="success" className="mb-4">
                  Thank you for your application! We'll review it and get back to you soon.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="name">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="email">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="position">
                      <Form.Label>Position Applied For *</Form.Label>
                      <Form.Control
                        as="select"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a position</option>
                        {careerData.positions.map((pos, index) => (
                          <option key={index} value={pos.title}>
                            {pos.title}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="phone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group controlId="coverLetter">
                      <Form.Label>Cover Letter</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us why you're interested in this position..."
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group controlId="resume">
                      <Form.Label>Resume/CV</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      <Form.Text className="text-muted">
                        Accepted formats: PDF, DOC, DOCX (Max 5MB)
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Button 
                      type="submit" 
                      variant="success" 
                      size="lg"
                      disabled={loading}
                      className="submit-btn"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Career;
