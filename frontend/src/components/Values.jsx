import { Container, Row, Col, Card } from "react-bootstrap";
import { FaLeaf, FaUsers, FaGraduationCap, FaHeart } from "react-icons/fa";
import "./Values.css";

function Values() {
  const values = [
    {
      icon: <FaLeaf />,
      title: "Sustainability",
      description: "We promote environmental stewardship and sustainable practices that ensure long-term community well-being and resource conservation for future generations."
    },
    {
      icon: <FaUsers />, 
      title: "Community Development",
      description: "We empower communities to work together, building strong social networks and collective capacity to address local challenges and opportunities."
    },
    {
      icon: <FaGraduationCap />,
      title: "Education & Innovation",
      description: "We provide quality education and embrace innovative solutions that equip individuals with knowledge and skills for personal and community growth."
    },
    {
      icon: <FaHeart />,
      title: "Stewardship of Creation",
      description: "We care for and protect our natural environment, recognizing our responsibility to preserve creation for current and future generations."
    }
  ];

  return (
    <div className="values-section">
      <Container>
        <h2 className="section-title text-center">Values</h2>
        <p className="section-subtitle">
          The core principles that guide our mission and daily operations
        </p>
        
        <Row className="g-4 justify-content-center">
          {values.map((value, index) => (
            <Col xs={12} sm={6} md={4} lg={3} xl={3} className="d-flex justify-content-center" key={index}>
              <Card className="h-80 value-card">
                <Card.Body className="text-center">
                  <div className="value-icon">
                    {value.icon}
                  </div>
                  <Card.Title as="h5">{value.title}</Card.Title>
                  <Card.Text>{value.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Values;