import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";
import educationImage from "../assets/education.jpg";

function Education() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "100px", backgroundColor: "#f8f9fa" }}>
        {/* Hero Section */}
        <div
          style={{
            position: "relative",
            height: "500px",
            marginBottom: "50px",
            overflow: "hidden",
          }}
        >
          <img
            src={educationImage}
            alt="Education Programs"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, rgba(0, 4, 40, 0.7) 0%, rgba(0, 78, 146, 0.7) 100%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Container>
              <Row className="align-items-center">
                <Col lg={12} className="text-center text-white">
                  <h1 className="display-4 fw-bold mb-4">
                    📚 Education Programs
                  </h1>
                  <p className="lead mb-0">
                    Empowering learners and school communities with educational support,
                    mentorship, and leadership development to create brighter futures.
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        <Container id="programs">
          {/* Key Programs */}
          <Row className="mb-5">
            <Col lg={12}>
              <h2 className="text-center mb-5" style={{ color: "#000428" }}>
                Our Key Education Programs
              </h2>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#000428",
                    }}
                  >
                    🎒
                  </div>
                  <h5>Education Support</h5>
                  <p className="text-muted">
                    Providing education levies, uniforms, and essential materials
                    to ensure children can access and stay in school
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#000428",
                    }}
                  >
                    🧠
                  </div>
                  <h5>Mentorship & Mental Health</h5>
                  <p className="text-muted">
                    Pairing young people with role models and providing
                    mental health support for well-rounded development
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#000428",
                    }}
                  >
                    🏫
                  </div>
                  <h5>School Leadership Empowerment</h5>
                  <p className="text-muted">
                    Empowering teachers, heads, and student leaders with
                    tools and training for transformative change
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm bg-warning text-dark">
                <Card.Body>
                  <h2 className="fw-bold">95%</h2>
                  <p>School Retention Rate</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Call to Action */}
          <Row className="mt-5">
            <Col lg={12}>
              <Card
                className="text-center border-0 shadow"
                style={{
                  background: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
                  color: "white",
                }}
              >
                <Card.Body className="p-5">
                  <h2 className="mb-3">Transform Lives Through Education</h2>
                  <p className="lead mb-4">
                    Join us in our mission to provide quality education and
                    mentorship to every child. Your support creates opportunities.
                  </p>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Button variant="light" size="lg">
                      🎒 Support a Student
                    </Button>
                    <Button variant="outline-light" size="lg">
                      💚 Donate Now
                    </Button>
                    <Button variant="outline-light" size="lg">
                      📧 Subscribe to Updates
                    </Button>
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

export default Education;