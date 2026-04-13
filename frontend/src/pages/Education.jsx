import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Education() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "76px" }}>
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h1 className="text-center" style={{ color: "#198754" }}>
                <i className="fas fa-graduation-cap me-3"></i>
                Education Program
              </h1>
              <p className="text-center lead">
                Empowering pupils and rural communities through educational programs and capacity building initiatives.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#198754" }}>Our Focus Areas</h3>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      School infrastructure development
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Scholarship programs for underprivileged students
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Teacher training and capacity building
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Digital literacy and computer education
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-success me-2"></i>
                      Adult education and vocational training
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#198754" }}>Impact</h3>
                  <p className="mt-3">
                    Our education program has transformed thousands of lives by providing access to quality education in rural communities. We believe that education is the foundation for sustainable development and community empowerment.
                  </p>
                  <p>
                    Through our partnerships with local schools and communities, we have established learning centers, distributed educational materials, and created mentorship programs that inspire the next generation of leaders.
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
                onClick={() => window.scrollTo(0, 0)}
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

export default Education;
