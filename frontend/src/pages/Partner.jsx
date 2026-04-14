import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Partner() {
  const [formData, setFormData] = useState({
    organization: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your interest! We will contact you soon.");
  };

  const partnershipTypes = [
    {
      title: "Corporate Partnership",
      description: "Partner with us to fulfill your CSR goals and make a lasting impact in communities.",
      icon: "fas fa-building"
    },
    {
      title: "NGO Collaboration",
      description: "Work together with us on joint programs and amplify our collective impact.",
      icon: "fas fa-hands-helping"
    },
    {
      title: "Government Partnership",
      description: "Collaborate on large-scale development initiatives and policy implementation.",
      icon: "fas fa-landmark"
    },
    {
      title: "Individual Support",
      description: "Become a volunteer or ambassador and help us spread our mission.",
      icon: "fas fa-user-friends"
    }
  ];

  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "76px" }}>
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h1 className="text-center" style={{ color: "#198754" }}>
                Partner With Us
              </h1>
              <p className="text-center lead">
                Join hands with us to create lasting change in communities.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            {partnershipTypes.map((type, index) => (
              <Col lg={3} md={6} key={index}>
                <Card className="h-100 text-center shadow-sm">
                  <Card.Body>
                    <i className={`${type.icon} fa-3x text-success mb-3`}></i>
                    <Card.Title className="h5">{type.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {type.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="shadow">
                <Card.Body>
                  <h3 className="text-center mb-4" style={{ color: "#198754" }}>
                    Express Your Interest
                  </h3>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Organization Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Your organization"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Contact Person</Form.Label>
                          <Form.Control
                            type="text"
                            name="contactName"
                            value={formData.contactName}
                            onChange={handleChange}
                            placeholder="Full name"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+254..."
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Partnership Type</Form.Label>
                      <Form.Select
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select partnership type</option>
                        <option value="corporate">Corporate Partnership</option>
                        <option value="ngo">NGO Collaboration</option>
                        <option value="government">Government Partnership</option>
                        <option value="individual">Individual Support</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your partnership interests..."
                      />
                    </Form.Group>
                    <div className="text-center">
                      <Button variant="success" type="submit" size="lg">
                        Submit Application
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col className="text-center">
              <Button 
                as={Link} 
                to="/" 
                variant="outline-success"
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Partner;
