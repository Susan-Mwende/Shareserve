import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Modal, Badge } from "react-bootstrap";
import axios from "axios";
import MpesaPaymentModal from "./MpesaPaymentModal.jsx";
import "./Projects.css";
import { API_ENDPOINTS } from "../config/api.js";

function Projects() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.PROGRAMS)
      .then((res) => setPrograms(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Get the most recent featured project for each category
  const getLatestFeaturedProjectByCategory = (categoryTitle) => {
    const featuredProjects = programs.filter(project => 
      project.category === categoryTitle && project.status !== 'completed'
    );
    if (featuredProjects.length > 0) {
      // Sort by _id (assuming newer projects have higher IDs) or you could use a date field
      return featuredProjects.sort((a, b) => b._id.localeCompare(a._id))[0];
    }
    return null;
  };

  // Get all latest featured projects (one per category)
  const latestFeaturedProjects = [
    { category: 'Education', project: getLatestFeaturedProjectByCategory('Education') },
    { category: 'Livelihood', project: getLatestFeaturedProjectByCategory('Livelihood') },
    { category: 'Environment', project: getLatestFeaturedProjectByCategory('Environment') },
    { category: 'Health', project: getLatestFeaturedProjectByCategory('Health') }
  ].filter(item => item.project !== null); // Remove categories with no projects

  const getCategoryIcon = (category) => {
    const icons = {
      Health: "fas fa-heartbeat",
      Education: "fas fa-graduation-cap",
      Livelihood: "fas fa-briefcase",
      Environment: "fas fa-leaf"
    };
    return icons[category] || "fas fa-tasks";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Health: "#dc3545",
      Education: "#198754",
      Livelihood: "#F08000",
      Environment: "#28a745"
    };
    return colors[category] || "#6c757d";
  };

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const handleSupport = (program) => {
    setSelectedProgram(program);
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProgram(null);
  };

  const handleCloseDonateModal = () => {
    setShowDonateModal(false);
    setSelectedProgram(null);
  };

  const getStatusBadge = (status) => {
    const variant = {
      active: "success",
      planning: "warning", 
      completed: "primary"
    }[status];
    return <Badge bg={variant}>{status}</Badge>;
  };

  return (
    <Container className="mt-2">
      <h2 className="text-center fw-semibold mb-2">Featured Projects</h2>
      <p className="text-center text-muted mb-3">
        The most recent projects from each program category
      </p>

      {latestFeaturedProjects.length === 0 ? (
        <div className="text-center py-2">
          <p className="text-muted">No featured projects available at the moment.</p>
        </div>
      ) : (
        <Row className="g-2">
          {latestFeaturedProjects.map(({ category, project }) => (
            <Col md={3} className="mb-2" key={project._id}>
              <Card className="h-100 project-card">
                <div
                  className="program-image"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    height: "150px"
                  }}
                />

                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="h6">{project.title}</Card.Title>
                    {getStatusBadge(project.status)}
                  </div>
                  
                  <div className="mb-2">
                    <Badge bg="secondary" className="me-2">{category}</Badge>
                  </div>
                  
                  <Card.Text className="text-muted small flex-grow-1">
                    {project.description}
                  </Card.Text>
                  
                  <div className="mt-auto">
                    <div className="mb-2">
                      <small className="text-muted">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        {project.location}
                      </small>
                    </div>
                    
                    {project.beneficiaries > 0 && (
                      <div className="mb-3">
                        <small className="text-muted">
                          <i className="fas fa-users me-1"></i>
                          {project.beneficiaries.toLocaleString()} beneficiaries
                        </small>
                      </div>
                    )}

                    <div className="d-flex gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleProgramClick(project)}
                      >
                        View Details
                      </Button>
                      
                      {project.status === 'active' && (
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => handleSupport(project)}
                        >
                          Support
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Program Detail Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="d-flex align-items-center">
              <i 
                className={`${getCategoryIcon(selectedProgram?.category)} me-2`}
                style={{ color: getCategoryColor(selectedProgram?.category)}}
              ></i>
              {selectedProgram?.title}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProgram && (
            <Row>
              <Col md={6}>
                <img 
                  src={selectedProgram.image} 
                  alt={selectedProgram.title}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />
              </Col>
              <Col md={6}>
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-secondary me-2">{selectedProgram.category}</span>
                  {getStatusBadge(selectedProgram.status)}
                </div>
                <p><strong>Location:</strong> {selectedProgram.location}</p>
                <p><strong>Beneficiaries:</strong> {selectedProgram.beneficiaries?.toLocaleString() || 0}</p>
                
                <h5>Description</h5>
                <p>{selectedProgram.description}</p>
                
                {selectedProgram.budget && (
                  <div className="mt-3">
                    <h6>Budget Information</h6>
                    <p><strong>Target:</strong> ${selectedProgram.budget.target?.toLocaleString()}</p>
                    <p><strong>Raised:</strong> ${selectedProgram.budget.raised?.toLocaleString()}</p>
                    <div className="progress mt-2">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${(selectedProgram.budget.raised / selectedProgram.budget.target * 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          {selectedProgram?.status === 'active' && (
            <Button 
              variant="success" 
              onClick={() => {
                handleCloseModal();
                setShowPaymentModal(true);
              }}
            >
              Support This Project
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* M-Pesa Payment Modal */}
      <MpesaPaymentModal 
        show={showPaymentModal} 
        onHide={() => setShowPaymentModal(false)} 
      />

      {/* Donate Modal - Import MpesaPaymentModal if needed */}
      {showDonateModal && (
        <div className="text-center">
          <p>Donate functionality would be implemented here</p>
          <Button variant="secondary" onClick={handleCloseDonateModal}>Close</Button>
        </div>
      )}
    </Container>
  );
}

export default Projects;
