import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
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
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ textDecoration: 'none', color: '#198754', display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            <img 
              src={logo} 
              alt="ShareServe International" 
              style={{ height: '40px', marginRight: '10px' }}
            />
            ShareServe International
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
                <NavDropdown.Item as={Link} to="/about" style={{ fontWeight: '500' }}>
                  Who We Are
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mission" style={{ fontWeight: '500' }}>
                  Our Mission
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/vision" style={{ fontWeight: '500' }}>
                  Our Vision
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/values" style={{ fontWeight: '500' }}>
                  Our Values
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link 
                onClick={() => scrollToSection('programs')}
                style={{ cursor: 'pointer', fontWeight: '500', color: '#333' }}
              >
                Programs
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('projects')}
                style={{ cursor: 'pointer', fontWeight: '500', color: '#333' }}
              >
                Projects
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('footer')}
                style={{ cursor: 'pointer', fontWeight: '500', color: '#333' }}
              >
                Contact
              </Nav.Link>
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