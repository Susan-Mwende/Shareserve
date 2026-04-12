import { Container, Row, Col, Card } from "react-bootstrap";
import "./Values.css";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";

function Values() {
  const values = [
    {
      icon: "👤",
      title: "Dignity",
      description: "We honor the inherent worth of every individual, treating all people with respect and compassion regardless of their circumstances."
    },
    {
      icon: "❤️",
      title: "Empathy",
      description: "We seek to understand and share the feelings of those we serve, building connections based on genuine care and mutual understanding."
    },
    {
      icon: "🤝",
      title: "Integrity",
      description: "We operate with transparency and accountability in all our programs, ensuring trust and ethical conduct in everything we do."
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description: "We are committed to environmental stewardship and creating lasting solutions that benefit both people and the planet."
    },
    {
      icon: "💪",
      title: "Empowerment",
      description: "We believe in equipping communities with the knowledge and tools they need to drive their own development."
    },
    {
      icon: "🤲",
      title: "Service",
      description: "We dedicate ourselves to serving others with humility and a genuine desire to make a positive impact."
    }
  ];

  return (
    <>
      <NavbarComponent />
      <Container className="pt-5" id="values" style={{ marginTop: '80px' }}>
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <h1 className="text-center mb-4" style={{ color: "#198754" }}>
            Our Values
          </h1>
          <p className="lead text-center">
            These core principles guide everything we do at ShareServe International
          </p>
        </Col>
      </Row>
      <Row className="g-4">
        {values.map((value, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="value-card text-center h-100 shadow">
              <Card.Body className="p-4">
                <div className="value-icon mb-3" style={{ fontSize: '2.5rem' }}>
                  {value.icon}
                </div>
                <h4 className="mb-3" style={{ color: "#198754" }}>
                  {value.title}
                </h4>
                <p className="text-muted">
                  {value.description}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Values;
