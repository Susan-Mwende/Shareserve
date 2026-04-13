import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Environment() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "76px" }}>
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h1 className="text-center" style={{ color: "#28a745" }}>
                <i className="fas fa-leaf me-3"></i>
                Environment Program
              </h1>
              <p className="text-center lead">
                Environmental conservation and restoration through tree growing and climate action initiatives.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#28a745" }}>Our Focus Areas</h3>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Tree planting and forest restoration
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Climate change awareness and education
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Waste management and recycling programs
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Water conservation and protection
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Sustainable agriculture practices
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#28a745" }}>Impact</h3>
                  <p className="mt-3">
                    Our environment program is dedicated to protecting and restoring the natural environment for future generations. We work with communities to implement sustainable practices that benefit both people and the planet.
                  </p>
                  <p>
                    Through tree planting initiatives, we have restored degraded lands, improved air quality, and created habitats for wildlife. Our climate action programs help communities adapt to and mitigate the effects of climate change.
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
                variant="outline-success"
                className="me-3"
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Button>
              <Button 
                variant="success"
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

export default Environment;
