import { Container, Button, Modal, Form, Alert } from "react-bootstrap";
import { useState } from "react";
import heroImage from "../assets/hero.jpg";
import "./Hero.css";
import "./HeroCenter.css";
import "./HeroContact.css";
import MpesaPaymentModal from "./MpesaPaymentModal.jsx";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

function Hero() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'join' // 'join' or 'partner'
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
      const response = await axios.post(`${API_ENDPOINTS.PARTNER}`, {
        ...contactForm,
        recipient: 'info@shareserve.org'
      });

      if (response.data.success) {
        setSuccess('Your message has been sent successfully! We will contact you soon.');
        // Reset form
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'join'
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

  const openContactModal = (type) => {
    setContactForm(prev => ({
      ...prev,
      type,
      subject: type === 'join' ? 'Join the Movement Inquiry' : 'Partnership Inquiry'
    }));
    setShowContactModal(true);
  };

  return (
    <>
      <div
        className="hero-section text-white rounded"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <Container>
            <div className="hero-content">
              <h1 className="hero-title">Raising 100,000 + young environmental champions</h1>
              <p className="hero-subtitle">
               Empowering pupils and rural communities in Kenya to restore environment through education,tree growing and sustainale livelihoods.
              </p>
              
            

              <div className="mt-4">
                <Button variant="success" className="me-2 btn-lg" onClick={() => openContactModal('join')}>
                   Join the Movement
                </Button>
                <Button variant="outline-light" className="me-2 btn-lg" style={{backgroundColor:'#F08000'}} onClick={() => openContactModal('partner')}>
                   Partner With Us
                </Button>
                <Button 
                  variant="success" 
                  className="btn-lg"
                  style={{ backgroundColor: '#198754', borderColor: '#198754' }}
                  onClick={() => setShowPaymentModal(true)}
                >
                  Donate Now
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <MpesaPaymentModal 
        show={showPaymentModal} 
        onHide={() => setShowPaymentModal(false)} 
      />

      {/* Contact Modal for Join/Partner */}
      <Modal show={showContactModal} onHide={() => setShowContactModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#198754', color: 'white' }}>
          <Modal.Title className="d-flex align-items-center">
            <span className="me-2"></span>
            {contactForm.type === 'join' ? 'Join the Movement' : 'Partner With Us'}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="p-4">
          {success && (
            <Alert variant="success" className="mb-4">
              <Alert.Heading className="d-flex align-items-center">
                <span className="me-2">✅</span>
                Message Sent Successfully!
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
                <Form.Label>Your Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
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
                  placeholder={contactForm.type === 'join' ? 'Join the Movement Inquiry' : 'Partnership Inquiry'}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Message *</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  placeholder={
                    contactForm.type === 'join' 
                      ? 'Tell us why you want to join the movement and how you\'d like to contribute...'
                      : 'Tell us about your organization and how you\'d like to partner with ShareServe...'
                  }
                  rows="5"
                  required
                />
              </Form.Group>

              <Alert variant="info" className="mb-4">
                <Alert.Heading className="d-flex align-items-center">
                  <span className="me-2"></span>
                  Contact Information
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
                    'Send Message'
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
    </>
  );
}

export default Hero;