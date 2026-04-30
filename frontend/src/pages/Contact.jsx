import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: "fas fa-map-marker-alt",
      title: "Address",
      details: "Nairobi, Kenya"
    },
    {
      icon: "fas fa-phone",
      title: "Phone",
      details: "+254 700 123 456"
    },
    {
      icon: "fas fa-envelope",
      title: "Email",
      details: "info@shareserve.org"
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
                Contact Us
              </h1>
              <p className="text-center lead">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </Col>
          </Row>

          {showSuccess && (
            <Alert variant="success" className="mb-4" dismissible onClose={() => setShowSuccess(false)}>
              <i className="fas fa-check-circle me-2"></i>
              Thank you for contacting us! We'll get back to you soon.
            </Alert>
          )}

          <Row className="g-4">
            <Col lg={8}>
              <Card className="shadow">
                <Card.Body className="p-4">
                  <h3 className="mb-4" style={{ color: "#198754" }}>
                    Send us a Message
                  </h3>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Subject *</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What's this about?"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </Form.Group>
                    <div className="text-center">
                      <Button variant="success" type="submit" size="lg">
                        <i className="fas fa-paper-plane me-2"></i>
                        Send Message
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <div className="mb-4">
                <h3 className="mb-4" style={{ color: "#198754" }}>
                  Get in Touch
                </h3>
                {contactInfo.map((info, index) => (
                  <Card className="mb-3 shadow-sm" key={index}>
                    <Card.Body className="d-flex align-items-center">
                      <div className="me-3">
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#198754",
                            borderRadius: "50%",
                            color: "white"
                          }}
                        >
                          <i className={info.icon}></i>
                        </div>
                      </div>
                      <div>
                        <h6 className="mb-1">{info.title}</h6>
                        <p className="mb-0 text-muted">{info.details}</p>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>

              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="mb-3" style={{ color: "#198754" }}>
                    Office Hours
                  </h5>
                  <p className="mb-2">
                    <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
                  </p>
                  <p className="mb-2">
                    <strong>Saturday:</strong> 9:00 AM - 2:00 PM
                  </p>
                  <p className="mb-0">
                    <strong>Sunday:</strong> Closed
                  </p>
                </Card.Body>
              </Card>

              <Card className="shadow-sm mt-3">
                <Card.Body>
                  <h5 className="mb-3" style={{ color: "#198754" }}>
                    Follow Us
                  </h5>
                  <div className="d-flex gap-3">
                    <Button variant="outline-success" size="sm">
                      <i className="fab fa-facebook-f"></i>
                    </Button>
                    <Button variant="outline-success" size="sm">
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button variant="outline-success" size="sm">
                      <i className="fab fa-instagram"></i>
                    </Button>
                    <Button variant="outline-success" size="sm">
                      <i className="fab fa-linkedin-in"></i>
                    </Button>
                  </div>
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

export default Contact;
