import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: ""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: "" });

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormStatus({ loading: false, success: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      setFormStatus({ 
        loading: false, 
        success: false, 
        error: "Failed to send message. Please try again." 
      });
    }
  };

  return (
    <div className="contact-section">
      <Container>
        <h2 className="section-title text-center">Contact Us</h2>
        <p className="section-subtitle">
          Get in touch with us to learn more about our programs
        </p>
        
        <Row className="g-4">
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-white">
                <Card.Title as="h4">Send us a Message</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
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

                  <Form.Group className="mb-3">
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us how we can help..."
                    />
                  </Form.Group>

                  {formStatus.success && (
                    <div className="alert alert-success">
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}

                  {formStatus.error && (
                    <div className="alert alert-danger">
                      {formStatus.error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    variant="success" 
                    disabled={formStatus.loading}
                    className="w-100"
                  >
                    {formStatus.loading ? "Sending..." : "Send Message"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Header className="bg-white">
                <Card.Title as="h4">Get in Touch</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="contact-info">
                  <div className="mb-4">
                    <h6 className="mb-2">
                      <span className="me-2">📧</span> Email
                    </h6>
                    <p className="text-muted mb-0">info@shareserve.org</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="mb-2">
                      <span className="me-2">📞</span> Phone
                    </h6>
                    <p className="text-muted mb-0">+254 123 456 789</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="mb-2">
                      <span className="me-2">📍</span> Location
                    </h6>
                    <p className="text-muted mb-0">Nairobi, Kenya</p>
                  </div>

                  <div className="mb-4">
                    <h6 className="mb-2">
                      <span className="me-2">🕐</span> Office Hours
                    </h6>
                    <p className="text-muted mb-0">
                      Mon - Fri: 9:00 AM - 5:00 PM
                    </p>
                  </div>

                  <div>
                    <h6 className="mb-3">
                      <span className="me-2">🌐</span> Follow Us
                    </h6>
                    <div className="social-links">
                      <Button variant="success" size="sm" className="me-2">
                        Facebook
                      </Button>
                      <Button variant="dark" size="sm" className="me-2">
                        Twitter
                      </Button>
                      <Button variant="secondary" size="sm">
                        Instagram
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Contact;
