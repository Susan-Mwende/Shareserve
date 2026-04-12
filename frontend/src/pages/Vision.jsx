import { Container, Row, Col, Card } from "react-bootstrap";
import "./Vision.css";

function Vision() {
  return (
    <Container className="mt-5 pt-5" id="vision">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="vision-card shadow-lg">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4" style={{ color: "#198754" }}>
                Our Vision
              </h1>
              <p className="lead text-center mb-4">
                To raise and equip 100,000+ young environmental champions through education, tree growing and community driven environmental action.
              </p>
              <hr className="my-4" />
              <h3 className="text-center mb-3" style={{ color: "#198754" }}>
                Our Dream
              </h3>
              <p className="text-center">
                A greener, more environmental Kenya led by younger resilient champions.
              </p>
              <div className="text-center mt-4">
                <p className="mb-2">
                  We envision a future where:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">✅ Communities are environmentally conscious</li>
                  <li className="mb-2">✅ Youth lead conservation efforts</li>
                  <li className="mb-2">✅ Sustainable practices are the norm</li>
                  <li className="mb-2">✅ Kenya's environment is restored and protected</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Vision;
