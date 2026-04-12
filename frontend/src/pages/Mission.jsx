import { Container, Row, Col, Card } from "react-bootstrap";
import "./Mission.css";

function Mission() {
  return (
    <Container className="mt-5 pt-5" id="mission">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="mission-card shadow-lg">
            <Card.Body className="p-5">
              <h1 className="text-center mb-4" style={{ color: "#198754" }}>
                Our Mission
              </h1>
              <p className="lead text-center mb-4">
                Shareserve International is a mission driven organization working in rural Kenya to address environmental degradation and economic vulnerability through youth empowerment and sustainable solutions.
              </p>
              <hr className="my-4" />
              <h3 className="text-center mb-3" style={{ color: "#198754" }}>
                What We Do
              </h3>
              <p className="text-center">
                We equip young learners with practical environmental skills while supporting rural communities with sustainable livelihoods.
              </p>
              <ul className="list-unstyled mt-4">
                <li className="mb-2">🌱 School Environmental Clubs</li>
                <li className="mb-2">🌳 Indigenous & Fruit Tree Growing</li>
                <li className="mb-2">🌍 Climate Change Education</li>
                <li className="mb-2">🤝 Community Restoration Projects</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Mission;
