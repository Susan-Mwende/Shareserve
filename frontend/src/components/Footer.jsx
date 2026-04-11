import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/ShareServe logo.png";
import MpesaPaymentModal from "./MpesaPaymentModal.jsx";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

function Footer() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "info@shareserve.org",
    phone: "+254 123 456 789",
    address: "Nairobi, Kenya",
    workingHours: {
      weekdays: "Mon - Fri: 9:00 AM - 5:00 PM",
      weekends: "Closed"
    },
    socialMedia: {}
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.CONTACT);
      setContactInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch contact info:", error);
    }
  };
  return (
    <>
      <footer className="footer-section" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      <Container>
        <Row>
          {/* Organization Info */}
          <Col md={3} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <img 
                src={logo} 
                alt="ShareServe International" 
                style={{ 
                  height: '50px', 
                  marginRight: '15px',
                  borderRadius: '8px'
                }}
              />
              <h5 className="footer-title mb-0" style={{ color: "#198754" }}>
                ShareServe International
              </h5>
            </div>
            <p className="footer-text" style={{ color: '#f8f9fa' }}>
              Creating a dignified, empowered society free from poverty through 
              sustainable development and community empowerment.
            </p>

            <div className="social-links mt-3">
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-4">
            <h5 className="footer-title" style={{ color: "#198754" }}>
              Quick Links
            </h5>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/"
                className="footer-link"
                style={{ color: "#ffffff" }}
                onMouseEnter={(e) => (e.target.style.color = "#198754")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/about"
                className="footer-link"
                style={{ color: "#ffffff" }}
                onMouseEnter={(e) => (e.target.style.color = "#198754")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                About Us
              </Nav.Link>

              <Nav.Link
                onClick={() => setShowPaymentModal(true)}
                className="footer-link"
                style={{ color: "#ffffff", cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.color = "#198754")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                Donate
              </Nav.Link>
            </Nav>
          </Col>

          {/* Get Involved */}
          <Col md={3} className="mb-4">
            <h5 className="footer-title" style={{ color: "#198754" }}>
              Get Involved
            </h5>
            <Nav className="flex-column">
              <Nav.Link
                href="#volunteer"
                className="footer-link"
                style={{ color: "#ffffff" }}
                onMouseEnter={(e) => (e.target.style.color = "#198754")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                Volunteer
              </Nav.Link>

              <Nav.Link
                href="#partner"
                className="footer-link"
                style={{ color: "#ffffff" }}
                onMouseEnter={(e) => (e.target.style.color = "#198754")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                Partner With Us
              </Nav.Link>

              <Nav.Link
                href="#careers"
                className="footer-link"
                style={{ color: "#ffffff" }}
                onMouseEnter={(e) => (e.target.style.color = "#198754")}
                onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
              >
                Careers
              </Nav.Link>
            </Nav>
          </Col>

          {/* Get In Touch */}
          <Col md={3} className="mb-4">
            <h5 className="footer-title" style={{ color: "#198754" }}>
              Get In Touch
            </h5>

            <div className="contact-info">
              <div
                className="mb-2"
                style={{ color: "#f8f9fa" }}
              >
                <span className="me-2">?</span>
                {contactInfo.email}
              </div>

              <div
                className="mb-2"
                style={{ color: "#f8f9fa" }}
              >
                <span className="me-2">?</span>
                {contactInfo.phone}
              </div>

              <div
                className="mb-2"
                style={{ color: "#f8f9fa" }}
              >
                <span className="me-2">?</span>
                {contactInfo.address}
              </div>

              <div
                className="mb-2"
                style={{ color: "#f8f9fa" }}
              >
                <span className="me-2">?</span>
                {contactInfo.workingHours?.weekdays || "Mon - Fri: 9:00 AM - 5:00 PM"}
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="mt-4 pt-3 border-top border-secondary">
          <Col className="text-center">
            <p
              className="mb-0 footer-text"
              style={{ color: "#ffffff" }}
              onMouseEnter={(e) => (e.target.style.color = "#198754")}
              onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
            >
              © 2026 LilyVale Technologies. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
    <MpesaPaymentModal 
      show={showPaymentModal} 
      onHide={() => setShowPaymentModal(false)} 
    />
    </>
  );
}

export default Footer;