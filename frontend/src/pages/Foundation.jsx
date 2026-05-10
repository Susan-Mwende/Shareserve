import { Container, Row, Col, Card } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Foundation() {
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
                    Our Foundation
                  </h1>
                  <p className="lead mb-4">
                    We believe the earth was created with abundance and balance, entrusted to humanity's care, 
                    and that we share a responsibility to protect and restore it for present and future generations.
                  </p>
                  <div className="mt-4">
                    <h4 style={{ color: "#198754" }}>Our Core Beliefs</h4>
                    <ul>
                      <li>The earth is a precious gift that must be stewarded responsibly</li>
                      <li>Environmental balance is essential for sustainable development</li>
                      <li>We have a collective responsibility to protect ecosystems</li>
                      <li>Future generations deserve to inherit a healthy planet</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 style={{ color: "#198754" }}>Our Commitment</h4>
                    <p>
                      We are committed to working with communities to restore environmental balance, 
                      promote sustainable practices, and empower young people to become guardians 
                      of our natural world for generations to come.
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

export default Foundation;