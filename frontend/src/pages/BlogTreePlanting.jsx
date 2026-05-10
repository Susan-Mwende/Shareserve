import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";
import carousel1 from "../assets/carousel1.jpeg";

function BlogTreePlanting() {
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
                  src={carousel1}
                  alt="Tree Planting Campaign"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body className="p-4">
                  <div className="mb-3">
                    <span className="badge bg-success text-white">Environment</span>
                    <small className="text-muted ms-3">March 28, 2026</small>
                  </div>
                  
                  <h1 className="mb-4" style={{ color: "#198754", fontWeight: "bold" }}>
                    Tree Planting Campaign: 5000 Trees Planted
                  </h1>
                  
                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: "#333" }}>Remarkable Environmental Success</h4>
                    <p className="lead" style={{ color: "#666", lineHeight: "1.8" }}>
                      Our environmental conservation efforts have achieved remarkable success with the planting of 5000 trees across degraded landscapes in rural communities. This ambitious campaign engaged over 300 community members, including youth groups, women's associations, and school environmental clubs.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: "#333" }}>Diverse Tree Species</h4>
                    <p className="lead" style={{ color: "#666", lineHeight: "1.8" }}>
                      The trees planted include indigenous species that restore biodiversity, fruit trees that provide food security and income, and fast-growing species for fuelwood to reduce pressure on natural forests. Beyond planting, we have established community nurseries for sustainable tree propagation and trained local caretakers in forest management.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: "#333" }}>Climate Action Impact</h4>
                    <p className="lead" style={{ color: "#666", lineHeight: "1.8" }}>
                      This initiative directly combats climate change, prevents soil erosion, restores water catchments, and creates green spaces that improve community wellbeing. Our commitment to environmental stewardship continues as we aim to plant 10,000 more trees in the coming year.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="mb-3" style={{ color: "#333" }}>Community Engagement</h4>
                    <p className="lead" style={{ color: "#666", lineHeight: "1.8" }}>
                      The success of this campaign demonstrates the power of collective action. Community members have taken ownership of these trees, ensuring their long-term survival and growth. Each tree planted represents hope for a greener future and a commitment to environmental sustainability for generations to come.
                    </p>
                  </div>

                  <div className="d-flex gap-3 mb-4">
                    <Button as={Link} to="/environment" variant="outline-success" size="lg">
                      🌱 Learn About Our Environment Work
                    </Button>
                    <Button as={Link} to="/contact" variant="success" size="lg">
                      🤝 Join Our Tree Planting Efforts
                    </Button>
                  </div>

                  <hr className="my-4" />

                  <div className="text-center">
                    <h5 className="mb-3" style={{ color: "#666" }}>Share This Impact Story</h5>
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

export default BlogTreePlanting;
