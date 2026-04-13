import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";
import { API_ENDPOINTS } from "../config/api.js";

function Livelihood() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.PROGRAMS);
      const livelihoodProjects = response.data.filter(
        (project) => project.category === "Livelihood"
      );
      setProjects(livelihoodProjects);
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
        <h3 className="mb-4" style={{ color: "#F08000", borderBottom: "2px solid #F08000", paddingBottom: "10px" }}>
          {title}
        </h3>
        <Row className="g-4">
          {statusProjects.map((project) => (
            <Col lg={4} md={6} key={project._id}>
              <Card className="h-100 shadow-sm">
                {project.image && (
                  <Card.Img
                    variant="top"
                    src={project.image}
                    alt={project.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="h5">{project.title}</Card.Title>
                    {getStatusBadge(project.status)}
                  </div>
                  <Card.Text className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {project.description}
                  </Card.Text>
                  <div className="mt-3">
                    <small className="text-muted d-block mb-1">
                      <i className="fas fa-map-marker-alt me-1"></i>
                      {project.location}
                    </small>
                    {project.beneficiaries > 0 && (
                      <small className="text-muted d-block">
                        <i className="fas fa-users me-1"></i>
                        {project.beneficiaries.toLocaleString()} beneficiaries
                      </small>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "76px" }}>
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h1 className="text-center" style={{ color: "#F08000" }}>
                Livelihood Program
              </h1>
              <p className="text-center lead">
                Creating sustainable economic opportunities and skills development for community members.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#F08000" }}>Our Focus Areas</h3>
                  <ul className="list-unstyled mt-3">
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Skills training and vocational education
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Micro-enterprise development
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Agriculture and farming support
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Financial literacy and savings programs
                    </li>
                    <li className="mb-3">
                      <i className="fas fa-check-circle text-warning me-2"></i>
                      Market linkage and business networking
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 border-0 shadow">
                <Card.Body>
                  <h3 style={{ color: "#F08000" }}>Impact</h3>
                  <p className="mt-3">
                    Our livelihood program empowers individuals and families to break the cycle of poverty by providing them with the skills, resources, and opportunities needed to build sustainable incomes.
                  </p>
                  <p>
                    We work closely with community members to identify local economic opportunities and provide training in areas such as agriculture, craftsmanship, and entrepreneurship.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Projects Section */}
          <div className="mb-4">
            <h2 className="text-center mb-4" style={{ color: "#F08000" }}>
              Our Livelihood Projects
            </h2>
            
            {loading ? (
              <div className="text-center py-5">
                <p>Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p>No livelihood projects found. Check back soon!</p>
              </div>
            ) : (
              <>
                {renderProjectSection("active", "Active Projects")}
                {renderProjectSection("planning", "Projects Under Planning")}
                {renderProjectSection("completed", "Completed Projects")}
              </>
            )}
          </div>

          <Row className="mt-5">
            <Col className="text-center">
              <Button 
                as={Link} 
                to="/" 
                variant="outline-warning"
                className="me-3"
                style={{ color: "#F08000", borderColor: "#F08000" }}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Button>
              <Button 
                style={{ backgroundColor: "#F08000", borderColor: "#F08000" }}
              >
                <i className="fas fa-donate me-2"></i>
                Support This Program
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Livelihood;
