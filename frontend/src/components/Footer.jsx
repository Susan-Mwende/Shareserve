import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/ShareServe logo.jpeg";
import MpesaPaymentModal from "./MpesaPaymentModal.jsx";

function Footer() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  return (
    <>
      <footer className="footer-section" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
        <Container>
          <Row className="g-4 py-4">
            {/* Organization Info */}
            <Col md={3} className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <img src={logo} alt="ShareServe International" style={{ height: '50px', marginRight: '15px', borderRadius: '8px' }} />
                <h5 className="footer-title mb-0" style={{ color: "#198754" }}>ShareServe International</h5>
              </div>
              <p className="footer-text" style={{ color: '#f8f9fa' }}>
                A mission driven organization working in rural Kenya to address environmental
                degradation and economic vulnerability through youth empowerment and sustainable solutions.
              </p>
            </Col>

            {/* Quick Links */}
            <Col md={2} className="mb-4">
              <h5 className="footer-title" style={{ color: "#198754" }}>Quick Links</h5>
              <Nav className="flex-column">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'About Us', to: '/about' },
                  { label: 'Our Mandate', to: '/our-mandate' },
                  { label: 'Meet Our Team', to: '/team' },
                  { label: 'Impact Stories', to: '/impact-stories' },
                ].map(({ label, to }) => (
                  <Nav.Link key={label} as={Link} to={to} className="footer-link ps-0" style={{ color: "#ffffff" }}
                    onMouseEnter={(e) => (e.target.style.color = "#198754")}
                    onMouseLeave={(e) => (e.target.style.color = "#ffffff")}>
                    {label}
                  </Nav.Link>
                ))}
              </Nav>
            </Col>

            {/* Get Involved */}
            <Col md={3} className="mb-4">
              <h5 className="footer-title" style={{ color: "#198754" }}>Get Involved</h5>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/partnership" className="footer-link ps-0" style={{ color: "#ffffff" }}
                  onMouseEnter={(e) => (e.target.style.color = "#198754")}
                  onMouseLeave={(e) => (e.target.style.color = "#ffffff")}>
                  Partner With Us
                </Nav.Link>
                <Nav.Link as={Link} to="/career" className="footer-link ps-0" style={{ color: "#ffffff" }}
                  onMouseEnter={(e) => (e.target.style.color = "#198754")}
                  onMouseLeave={(e) => (e.target.style.color = "#ffffff")}>
                  Careers
                </Nav.Link>
                <Nav.Link onClick={() => setShowPaymentModal(true)} className="footer-link ps-0" style={{ color: "#ffffff", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.target.style.color = "#198754")}
                  onMouseLeave={(e) => (e.target.style.color = "#ffffff")}>
                  Donate
                </Nav.Link>
                <Nav.Link as={Link} to="/blog" className="footer-link ps-0" style={{ color: "#ffffff" }}
                  onMouseEnter={(e) => (e.target.style.color = "#198754")}
                  onMouseLeave={(e) => (e.target.style.color = "#ffffff")}>
                  News &amp; Blogs
                </Nav.Link>
                <Nav.Link as={Link} to="/events" className="footer-link ps-0" style={{ color: "#ffffff" }}
                  onMouseEnter={(e) => (e.target.style.color = "#198754")}
                  onMouseLeave={(e) => (e.target.style.color = "#ffffff")}>
                  Events
                </Nav.Link>
              </Nav>
            </Col>

            {/* Get In Touch */}
            <Col md={4} className="mb-4">
              <h5 className="footer-title" style={{ color: "#198754" }}>Get In Touch</h5>
              <div className="contact-info">
                <div className="mb-2" style={{ color: "#f8f9fa" }}>
                  <span className="me-2">📧</span>
                  <a href="mailto:info@shareserve.org" style={{ color: '#f8f9fa', textDecoration: 'none' }}>
                    info@shareserve.org
                  </a>
                </div>
                <div className="mb-2" style={{ color: "#f8f9fa" }}>
                  <span className="me-2">📞</span>
                  +254 722 322 327
                </div>
                <div className="mb-2" style={{ color: "#f8f9fa", display: "flex", alignItems: "flex-start" }}>
                  <span className="me-2">📍</span>
                  <span>
                    Nazareth Court, Katani Road, House No. 3<br />
                    P.O Box 8981-00300, Nairobi
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          {/* Bottom Bar */}
          <Row className="pt-3 border-top border-secondary">
            <Col className="text-center">
              <p className="mb-0 footer-text" style={{ color: "#adb5bd" }}>
                © {new Date().getFullYear()} Shareserve International. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
      <MpesaPaymentModal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} />
    </>
  );
}

export default Footer;