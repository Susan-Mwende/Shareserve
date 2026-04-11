import { Container, Row, Col, Card, Modal, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "./Partners.css";
import "./PartnersContact.css";

function Partners() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'partner'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5001/api/contact/partner', {
        ...contactForm,
        recipient: 'suziemweshn@gmail.com'
      });

      if (response.data.success) {
        setSuccess('Your partnership inquiry has been sent successfully! We will contact you soon.');
        // Reset form
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'partner'
        });
        // Close modal after success
        setTimeout(() => {
          setShowContactModal(false);
          setSuccess('');
        }, 3000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openContactModal = () => {
    setContactForm(prev => ({
      ...prev,
      type: 'partner',
      subject: 'Partnership Inquiry'
    }));
    setShowContactModal(true);
  };
  const partners = [
    {
      name: "Ministry of Education Kenya",
      type: "Government Partner",
      description: "Collaborating on educational infrastructure and curriculum development for rural communities",
      logo: ""
    },
    {
      name: "World Health Organization",
      type: "Health Partner",
      description: "Joint initiatives on maternal health, immunization programs, and disease prevention",
      logo: ""
    },
    {
      "name": "Equity Bank Foundation",
      "type": "Financial Partner",
      "description": "Supporting microfinance initiatives and financial literacy programs for women entrepreneurs",
      "logo": "�"
    },
    {
      name: "Tech4Dev Kenya",
      type: "Technology Partner",
      description: "Providing digital solutions for program management, monitoring, and community engagement",
      logo: "💻"
    },
    {
      name: "UNICEF Kenya",
      type: "Development Partner",
      description: "Partner in child protection, education, and water, sanitation, and hygiene (WASH) programs",
      logo: "👶"
    },
    {
      name: "Local Community Leaders",
      type: "Community Partners",
      description: "Working with traditional leaders and community groups to ensure cultural relevance and sustainability",
      logo: "🤝"
    }
  ];

  return (
    <div className="partners-section">
      <Container>
        <h2 className="section-title text-center">Our Partners</h2>
        <p className="section-subtitle">
          Working together with organizations that share our vision for sustainable change
        </p>
        
        <Row className="g-4">
          {partners.map((partner, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="partner-card h-100">
                <Card.Body className="text-center">
                  <div className="partner-logo mb-3">
                    <span className="logo-icon">{partner.logo}</span>
                  </div>
                  <Card.Title as="h5" className="partner-name">{partner.name}</Card.Title>
                  <div className="partner-type mb-2">
                    <span className="badge bg-primary">{partner.type}</span>
                  </div>
                  <Card.Text className="partner-description">
                    {partner.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <h4>Interested in Partnering With Us?</h4>
          <p className="text-muted mb-4">
            Join us in our mission to create sustainable change in communities
          </p>
          <Button variant="success" className="btn-lg" onClick={openContactModal}>
            Become a Partner
          </Button>
        </div>
      </Container>
      
      {/* Partnership Contact Modal */}
      <Modal show={showContactModal} onHide={() => setShowContactModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#198754', color: 'white' }}>
          <Modal.Title className="d-flex align-items-center">
            <span className="me-2">🤝</span>
            Partner With Us
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="p-4">
          {success && (
            <Alert variant="success" className="mb-4">
              <Alert.Heading className="d-flex align-items-center">
                <span className="me-2">✅</span>
                Inquiry Sent Successfully!
              </Alert.Heading>
              <p>{success}</p>
            </Alert>
          )}
          
          {error && (
            <Alert variant="danger" className="mb-4">
              <Alert.Heading className="d-flex align-items-center">
                <span className="me-2">❌</span>
                Error
              </Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}

          {!success && !error && (
            <Form onSubmit={handleContactSubmit} className="contact-form">
              <Form.Group className="mb-3">
                <Form.Label>Organization Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter your organization name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject *</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  placeholder="Partnership Inquiry"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Partnership Details *</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your organization, the type of partnership you're interested in, and how you'd like to collaborate with ShareServe..."
                  rows="5"
                  required
                />
              </Form.Group>

              <Alert variant="info" className="mb-4">
                <Alert.Heading className="d-flex align-items-center">
                  <span className="me-2">📧</span>
                  Partnership Contact Information
                </Alert.Heading>
                <p className="mb-0">
                  <strong>Email:</strong> info@shareserve.org<br />
                  <strong>Phone:</strong> +254 712 345678<br />
                  <strong>Office Hours:</strong> Mon-Fri: 9AM-5PM, Sat: 10AM-2PM
                </p>
              </Alert>

              <div className="d-grid gap-2">
                <Button 
                  variant="success" 
                  type="submit" 
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Sending...
                    </>
                  ) : (
                    'Send Partnership Inquiry'
                  )}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowContactModal(false)}
                  className="w-100"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Partners;
