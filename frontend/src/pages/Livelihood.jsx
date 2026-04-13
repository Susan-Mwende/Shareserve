import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Livelihood() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "76px" }}>
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h1 className="text-center" style={{ color: "#F08000" }}>
                <i className="fas fa-briefcase me-3"></i>
                Livelihood Program
              </h1>
              <p className="text-center lead">
                Creating sustainable economic opportunities and skills development for community members.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#F08000" }}>Our Focus Areas</h3>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Skills training and vocational education
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Micro-enterprise development
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Agriculture and farming support
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Financial literacy and savings programs
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Market linkage and business networking
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#F08000" }}>Impact</h3>
                  <p className="mt-3">
                    Our livelihood program empowers individuals and families to break the cycle of poverty by providing them with the skills, resources, and opportunities needed to build sustainable incomes.
                  </p>
                  <p>
                    We work closely with community members to identify local economic opportunities and provide training in areas such as agriculture, craftsmanship, and entrepreneurship.
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
                variant="outline-warning"
                className="me-3"
                style={{ color: "#F08000", borderColor: "#F08000" }}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Button>
              <Button 
                style={{ backgroundColor: "#F08000", borderColor: "#F08000" }}
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

export default Livelihood;
