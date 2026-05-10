import { Container, Row, Col, Card } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function WhoWeAre() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "100px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-5">
                  <h1 className="mb-4" style={{ color: "#198754", fontWeight: "bold" }}>
                    Who We Are
                  </h1>
                  <p className="lead mb-4">
                    Shareserve International is a mission-driven organization working in rural Kenya 
                    to address environmental degradation and economic vulnerability through youth 
                    empowerment and sustainable solutions.
                  </p>
                  <div className="mt-4">
                    <h4 style={{ color: "#198754" }}>Our Mission</h4>
                    <p>
                      We are dedicated to creating sustainable change in rural communities by 
                      empowering young people with the skills, knowledge, and opportunities they need 
                      to become environmental champions and economic leaders.
                    </p>
                  </div>
                  <div className="mt-4">
                    <h4 style={{ color: "#198754" }}>Our Approach</h4>
                    <p>
                      Through innovative programs in environmental conservation, livelihood development, 
                      and education, we work hand-in-hand with communities to create lasting impact 
                      that benefits both people and the planet.
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default WhoWeAre;
