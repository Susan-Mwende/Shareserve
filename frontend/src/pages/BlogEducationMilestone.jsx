import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";
import educationImage from "../assets/education.jpg";

function BlogEducationMilestone() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "100px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Container className="py-5">
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0 shadow-sm">
                <Card.Img
                  variant="top"
                  src={educationImage}
                  alt="Education Program Milestone"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <span className="badge bg-primary text-white">Education</span>
                    <small className="text-muted ms-3">April 5, 2026</small>
                  </div>
                  
                  <h1 className="mb-4" style={{ color: "#0d6efd", fontWeight: "bold" }}>
                    Education Program Reaches 1000 Students Milestone
                  </h1>
                  
                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: "#333" }}>A Landmark Achievement</h4>
                    <p className="lead" style={{ color: "#666", lineHeight: "1.8" }}>
                      We are celebrating a major achievement as our education programs now support over 1000 students across rural Kenya. This milestone represents years of dedication, community partnership, and unwavering commitment to educational excellence.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: "#333" }}>Holistic Educational Support</h4>
                    <p className="lead" style={{ color: "#666", lineHeight: "1.8" }}>
                      Through scholarships, school supplies, mentorship programs, and infrastructure improvements, we have helped children stay in school and pursue their dreams. Our holistic approach includes not only academic support but also mental health counseling, leadership training, and extracurricular activities that build confidence and life skills.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: "#333" }}>Teacher Empowerment</h4>
                    <p className="lead" style={{ color: "#666", lineHeight: "1.8" }}>
                      Teachers in partner schools have received professional development training, and parents are engaged through community education workshops. This comprehensive approach ensures that our impact extends beyond individual students to transform entire learning ecosystems.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: "#333" }}>Building Future Leaders</h4>
                    <p className="lead" style={{ color: "#666", lineHeight: "1.8" }}>
                      This milestone represents countless hours of dedication from our team, volunteers, and community partners who share our vision of an educated, empowered generation that will lead Kenya into a brighter future. Each student reached represents a family transformed, a community strengthened, and a future secured.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: "#333" }}>Looking Ahead</h4>
                    <p className="lead" style={{ color: "#666", lineHeight: "1.8" }}>
                      As we celebrate this achievement, we remain focused on expanding our reach to touch even more young lives. Our goal is to ensure that every child in our communities has access to quality education, regardless of their economic circumstances.
                    </p>
                  </div>

                  <div className="d-flex gap-3 mb-4">
                    <Button as={Link} to="/education" variant="outline-primary" size="lg">
                      📚 Learn About Our Education Programs
                    </Button>
                    <Button as={Link} to="/contact" variant="primary" size="lg">
                      🤝 Get Involved
                    </Button>
                  </div>

                  <hr className="my-4" />

                  <div className="text-center">
                    <h5 className="mb-3" style={{ color: "#666" }}>Share This Story</h5>
                    <div className="d-flex justify-content-center gap-2">
                      <Button variant="outline-secondary" size="sm">
                        📘 Facebook
                      </Button>
                      <Button variant="outline-info" size="sm">
                        🐦 Twitter
                      </Button>
                      <Button variant="outline-success" size="sm">
                        📧 Email
                      </Button>
                    </div>
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

export default BlogEducationMilestone;
