import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/ShareServe logo.png";
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
      <Navbar bg="light" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ textDecoration: 'none', color: '#198754', display: 'flex', alignItems: 'center' }}>
            <img 
              src={logo} 
              alt="ShareServe International" 
              style={{ height: '40px', marginRight: '10px' }}
            />
            ShareServe International
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('about')}
                style={{ cursor: 'pointer' }}
              >
                About
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('programs')}
                style={{ cursor: 'pointer' }}
              >
                Programs
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('projects')}
                style={{ cursor: 'pointer' }}
              >
                Projects
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('footer')}
                style={{ cursor: 'pointer' }}
              >
                Contact
              </Nav.Link>
              <Button variant="success" onClick={() => setShowPaymentModal(true)}>Donate</Button>
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