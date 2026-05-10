import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";
import { API_ENDPOINTS } from "../config/api.js";
import carouselImage from "../assets/carousel1.jpeg";

function Environment() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PROGRAMS);
      const environmentProjects = response.data.filter(
        (project) => project.category === "Environment"
      );
      setProjects(environmentProjects);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setLoading(false);
    }
  };

  const getProjectsByStatus = (status) => {
    return projects.filter((project) => project.status === status);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Active</Badge>;
      case "completed":
        return <Badge bg="primary">Completed</Badge>;
      case "planning":
        return <Badge bg="warning">Under Planning</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const renderProjectSection = (status, title) => {
    const statusProjects = getProjectsByStatus(status);
    if (statusProjects.length === 0) return null;

    return (
      <div className="mb-5">
        <h3 className="mb-4" style={{ color: "#198754", fontWeight: "bold" }}>
          {title}
        </h3>
        <Row>
          {statusProjects.map((project) => (
            <Col lg={4} md={6} className="mb-4" key={project.id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={project.image}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="mb-1">{project.title}</Card.Title>
                    {getStatusBadge(project.status)}
                  </div>
                  <Card.Text className="text-muted small mb-3">
                    {project.location}
                  </Card.Text>
                  <Card.Text>{project.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="info" text="dark">
                      {project.beneficiaries} beneficiaries
                    </Badge>
                    <Button
                      as={Link}
                      to={`/projects/${project.id}`}
                      variant="outline-success"
                      size="sm"
                    >
                      Learn More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <NavbarComponent />
        <Container style={{ paddingTop: "100px" }}>
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
        <Footer />
      </>
    );
  }

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
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${carouselImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(25, 135, 84, 0.8) 0%, rgba(45, 106, 79, 0.8) 100%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Container>
              <Row className="align-items-center">
                <Col lg={12} className="text-center text-white">
                  <h1 className="display-4 fw-bold mb-4">
                    🌱 Environment & Climate Action
                  </h1>
                  <p className="lead mb-0">
                    Leading transformative environmental initiatives that protect our planet,
                    empower communities, and create sustainable futures for generations to come.
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        <Container id="programs">
          {/* Key Initiatives */}
          <Row className="mb-5">
            <Col lg={12}>
              <h2 className="text-center mb-5" style={{ color: "#198754" }}>
                Our Key Initiatives
              </h2>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#198754",
                    }}
                  >
                    🌳
                  </div>
                  <h5>Tree Planting Campaigns</h5>
                  <p className="text-muted">
                    Planting native trees to restore ecosystems and combat climate change
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#198754",
                    }}
                  >
                    🏫
                  </div>
                  <h5>Green Clubs in Schools</h5>
                  <p className="text-muted">
                    Establishing environmental clubs to nurture young climate champions
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#198754",
                    }}
                  >
                    🍎
                  </div>
                  <h5>Demo Fruit Orchards</h5>
                  <p className="text-muted">
                    Creating sustainable food sources and teaching agricultural skills
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#198754",
                    }}
                  >
                    👥
                  </div>
                  <h5>Leadership Development</h5>
                  <p className="text-muted">
                    Training environmental leaders to drive community change
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Active Projects */}
          {renderProjectSection("active", "🚀 Active Projects")}
          {renderProjectSection("planning", "📋 Under Planning")}
          {renderProjectSection("completed", "✅ Completed Projects")}

          {/* Impact Stats */}
          <Row id="impact" className="mt-5 mb-5">
            <Col lg={12}>
              <h2 className="text-center mb-5" style={{ color: "#198754" }}>
                Our Environmental Impact
              </h2>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="text-center border-0 shadow-sm bg-success text-white">
                <Card.Body>
                  <h2 className="fw-bold">50,000+</h2>
                  <p>Trees Planted</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="text-center border-0 shadow-sm bg-info text-white">
                <Card.Body>
                  <h2 className="fw-bold">100+</h2>
                  <p>Green Clubs Established</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="text-center border-0 shadow-sm bg-warning text-dark">
                <Card.Body>
                  <h2 className="fw-bold">25</h2>
                  <p>Demo Orchards Created</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="text-center border-0 shadow-sm bg-primary text-white">
                <Card.Body>
                  <h2 className="fw-bold">5,000+</h2>
                  <p>Young Leaders Trained</p>
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
                  background: "linear-gradient(135deg, #198754 0%, #2d6a4f 100%)",
                  color: "white",
                }}
              >
                <Card.Body className="p-5">
                  <h2 className="mb-3">Join Our Environmental Movement</h2>
                  <p className="lead mb-4">
                    Be part of the solution. Support our environmental initiatives and help
                    create a sustainable future for generations to come.
                  </p>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Button variant="light" size="lg">
                      🌱 Plant a Tree
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

export default Environment;
