import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Health() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "76px" }}>
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h1 className="text-center" style={{ color: "#dc3545" }}>
                <i className="fas fa-heartbeat me-3"></i>
                Health Program
              </h1>
              <p className="text-center lead">
                Improving community health outcomes through accessible healthcare and health education programs.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#dc3545" }}>Our Focus Areas</h3>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-danger me-2"></i>
                      Mobile health clinics and medical camps
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-danger me-2"></i>
                      Maternal and child health programs
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-danger me-2"></i>
                      Health education and disease prevention
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-danger me-2"></i>
                      Nutrition and food security initiatives
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-danger me-2"></i>
                      Clean water and sanitation projects
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#dc3545" }}>Impact</h3>
                  <p className="mt-3">
                    Our health program is committed to ensuring that every community member has access to quality healthcare services. We focus on preventive care, health education, and building resilient health systems.
                  </p>
                  <p>
                    Through our mobile clinics and community health workers, we have provided medical services to thousands of people in remote areas. Our health education programs empower communities to take charge of their well-being.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col className="text-center">
              <Button 
                as={Link} 
                to="/" 
                variant="outline-danger"
                className="me-3"
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Button>
              <Button 
                variant="danger"
              >
                <i className="fas fa-donate me-2"></i>
                Support This Program
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Health;
