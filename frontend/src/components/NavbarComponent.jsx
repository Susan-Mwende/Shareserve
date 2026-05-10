import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/ShareServe logo.jpeg";
import MpesaPaymentModal from "./MpesaPaymentModal.jsx";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function NavbarComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <Navbar 
        bg="light" 
        expand="lg" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1030,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          minHeight: '80px',
          padding: '10px 0'
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            <div 
              style={{ 
                backgroundColor: '#F08000CC', 
                padding: '8px 16px', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <img 
                src={logo} 
                alt="ShareServe International" 
                style={{ height: '60px', width: '150px', objectFit: 'contain', marginRight: '12px' }}
              />
              ShareServe International
            </div>
          </Navbar.Brand>
          <Navbar.Toggle 
            style={{ borderColor: '#198754' }}
          />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={location.pathname === "/" ? "active" : ""}
                style={{ fontWeight: '500', color: '#333' }}
              >
                Home
              </Nav.Link>
              <NavDropdown 
                title="About" 
                id="about-dropdown"
                style={{ fontWeight: '500', color: '#333' }}
              >
                <NavDropdown.Item 
                  onClick={() => {
                    navigate('/');
                    setTimeout(() => scrollToSection('about'), 100);
                  }}
                  style={{ fontWeight: '500', cursor: 'pointer' }}
                >
                  Who We Are
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/foundation" style={{ fontWeight: '500' }}>
                  Our Foundation
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/our-mandate" style={{ fontWeight: '500' }}>
                  Our Mandate, Vision & Values
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/team" style={{ fontWeight: '500' }}>
                  Meet Our Team
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown 
                title="Our Work" 
                id="work-dropdown"
                style={{ fontWeight: '500', color: '#333' }}
              >
                <NavDropdown.Item as={Link} to="/environment" style={{ fontWeight: '500' }}>
                  Environment & Climate Action
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/livelihood" style={{ fontWeight: '500' }}>
                  Livelihood & Economic Empowerment
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/education" style={{ fontWeight: '500' }}>
                  Education
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown 
                title="Impact" 
                id="impact-dropdown"
                style={{ fontWeight: '500', color: '#333' }}
              >
                <NavDropdown.Item as={Link} to="/impact-stories" style={{ fontWeight: '500' }}>
                  Impact Stories
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/annual-report" style={{ fontWeight: '500' }}>
                  Annual Report
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/testimonials" style={{ fontWeight: '500' }}>
                  Testimonial
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown 
                title="Stay Informed" 
                id="stay-informed-dropdown"
                style={{ fontWeight: '500', color: '#333' }}
              >
                <NavDropdown.Item as={Link} to="/news" style={{ fontWeight: '500' }}>
                  News
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/#blog" style={{ fontWeight: '500' }}>
                  Blogs
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/events" style={{ fontWeight: '500' }}>
                  Events
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/gallery" style={{ fontWeight: '500' }}>
                  Gallery
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/#blog" style={{ fontWeight: '500' }}>
                  Publications
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown 
                title="Get Involved" 
                id="get-involved-dropdown"
                style={{ fontWeight: '500', color: '#333' }}
              >
                <NavDropdown.Item as={Link} to="/partnership" style={{ fontWeight: '500' }}>
                  Partnership
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/career" style={{ fontWeight: '500' }}>
                  Career
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setShowPaymentModal(true)} style={{ fontWeight: '500' }}>
                  Donate
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Contact" style={{ fontWeight: '500', color: '#333' }}>
                <NavDropdown.Item as={Link} to="/contact" style={{ fontWeight: '500' }}>
                  Contact Us
                </NavDropdown.Item>
              </NavDropdown>
              <Button 
                variant="success" 
                onClick={() => setShowPaymentModal(true)}
                style={{ marginLeft: '10px', fontWeight: '500' }}
              >
                Donate
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MpesaPaymentModal 
        show={showPaymentModal} 
        onHide={() => setShowPaymentModal(false)} 
      />
    </>
  );
}

export default NavbarComponent;