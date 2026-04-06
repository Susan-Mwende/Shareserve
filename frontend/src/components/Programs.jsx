import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import MpesaPaymentModal from "./MpesaPaymentModal.jsx";
import "./Programs.css";
import { API_ENDPOINTS } from "../config/api.js";

function Programs() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [selectedProjectsCategory, setSelectedProjectsCategory] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetailModal, setShowProjectDetailModal] = useState(false);

  // Fetch actual projects from API
  useEffect(() => {
    axios
      .get(API_ENDPOINTS.PROGRAMS)
      .then((res) => setAllProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  const programCategories = [
    {
      id: 'education',
      title: 'Education',
      icon: 'fas fa-graduation-cap',
      description: 'Empowering pupils and rural communities through educational programs and capacity building initiatives.',
      color: '#198754'
    },
    {
      id: 'livelihood',
      title: 'Livelihood',
      icon: 'fas fa-briefcase',
      description: 'Creating sustainable economic opportunities and skills development for community members.',
      color: '#F08000'
    },
    {
      id: 'environment',
      title: 'Environment',
      icon: 'fas fa-leaf',
      description: 'Environmental conservation and restoration through tree growing and climate action initiatives.',
      color: '#28a745'
    },
    {
      id: 'health',
      title: 'Health',
      icon: 'fas fa-heartbeat',
      description: 'Improving community health outcomes through accessible healthcare and health education programs.',
      color: '#dc3545'
    }
  ];

  // Get active projects for a specific category
  const getActiveProjectsByCategory = (categoryTitle) => {
    return allProjects.filter(project => 
      project.category === categoryTitle && project.status === 'active'
    );
  };

  // Get featured projects for a specific category (excluding completed projects)
  const getFeaturedProjectsByCategory = (categoryTitle) => {
    return allProjects.filter(project => 
      project.category === categoryTitle && project.status !== 'completed'
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  const handleViewAllProjects = (category) => {
    setSelectedProjectsCategory(category);
    setShowProjectsModal(true);
    handleCloseModal();
  };

  const handleCloseProjectsModal = () => {
    setShowProjectsModal(false);
    setSelectedProjectsCategory(null);
  };

  const handleViewProjectDetails = (project) => {
    setSelectedProject(project);
    setShowProjectDetailModal(true);
  };

  const handleCloseProjectDetailModal = () => {
    setShowProjectDetailModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="programs-section">
      <Container>
        <h2 className="section-title text-center">Our Programs</h2>
        <p className="section-subtitle text-center">
          Explore our four core program areas designed to create comprehensive community development
        </p>

        <Row className="g-4">
          {programCategories.map((category) => (
            <Col lg={3} md={6} className="mb-4" key={category.id}>
              <Card 
                className="program-category-card h-100 text-center"
                onClick={() => handleCategoryClick(category)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="d-flex flex-column">
                  <div className="program-icon mb-3">
                    <i 
                      className={`${category.icon} fa-3x`}
                      style={{ color: category.color }}
                    ></i>
                  </div>
                  <Card.Title className="mb-3">{category.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {category.description}
                  </Card.Text>
                  <Button 
                    variant="outline-primary" 
                    className="mt-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category);
                    }}
                  >
                    View Projects
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Category Details Modal */}
        {selectedCategory && (
          <Modal show={!!selectedCategory} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  <i 
                    className={`${selectedCategory.icon} fa-2x me-3`}
                    style={{ color: selectedCategory.color }}
                  ></i>
                  {selectedCategory.title} Program
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="lead">{selectedCategory.description}</p>
              
              <h5 className="mt-4 mb-3">Active Projects in {selectedCategory.title}</h5>
              <div className="projects-list">
                {getActiveProjectsByCategory(selectedCategory.title).length > 0 ? (
                  getActiveProjectsByCategory(selectedCategory.title).map((project, index) => (
                    <div 
                      key={index} 
                      className="project-item mb-2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleViewProjectDetails(project)}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <i className="fas fa-project-diagram me-3" style={{ color: selectedCategory.color }}></i>
                          <span>{project.title}</span>
                        </div>
                        <small className="text-muted">{project.location}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No active projects currently in this category.</p>
                )}
              </div>
              
              <div className="text-center mt-4">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={() => handleViewAllProjects(selectedCategory)}
                >
                  View All {selectedCategory.title} Projects
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* View All Projects Modal */}
        {showProjectsModal && selectedProjectsCategory && (
          <Modal show={showProjectsModal} onHide={handleCloseProjectsModal} size="xl" centered>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  <i 
                    className={`${selectedProjectsCategory.icon} fa-2x me-3`}
                    style={{ color: selectedProjectsCategory.color }}
                  ></i>
                  All {selectedProjectsCategory.title} Projects
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="lead">Featured projects in the {selectedProjectsCategory.title} category</p>
              
              <Row className="g-4">
                {getFeaturedProjectsByCategory(selectedProjectsCategory.title).map((project, index) => (
                  <Col md={4} className="mb-4" key={index}>
                    <Card className="h-100 project-card-modal">
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <Card.Title className="h6">{project.title}</Card.Title>
                          <span className={`badge bg-${
                            project.status === 'active' ? 'success' : 
                            project.status === 'completed' ? 'primary' : 'warning'
                          }`}>
                            {project.status}
                          </span>
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
                              onClick={() => handleViewProjectDetails(project)}
                            >
                              View Details
                            </Button>
                            {project.status === 'active' && (
                              <Button 
                                variant="success" 
                                size="sm"
                                onClick={() => setShowPaymentModal(true)}
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
              
              {getFeaturedProjectsByCategory(selectedProjectsCategory.title).length === 0 && (
                <div className="text-center py-4">
                  <p className="text-muted">No featured projects found in this category.</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseProjectsModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* Project Detail Modal */}
        {showProjectDetailModal && selectedProject && (
          <Modal show={showProjectDetailModal} onHide={handleCloseProjectDetailModal} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>{selectedProject.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  {selectedProject.image && (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: "350px", objectFit: "cover", width: "100%" }}
                    />
                  )}
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <span className="badge bg-primary me-2">{selectedProject.category}</span>
                    <span className={`badge bg-${
                      selectedProject.status === 'active' ? 'success' : 
                      selectedProject.status === 'completed' ? 'secondary' : 'warning'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  
                  <div className="project-details-info">
                    <div className="detail-item mb-3">
                      <strong>Location:</strong> {selectedProject.location}
                    </div>
                    
                    {selectedProject.beneficiaries > 0 && (
                      <div className="detail-item mb-3">
                        <strong>Beneficiaries:</strong> {selectedProject.beneficiaries.toLocaleString()}
                      </div>
                    )}
                    
                    <div className="detail-item mb-4">
                      <strong>Description:</strong>
                      <p className="mt-2">{selectedProject.description}</p>
                    </div>
                    
                    {selectedProject.fullDescription && (
                      <div className="detail-item mb-4">
                        <strong>Additional Information:</strong>
                        <p className="mt-2">{selectedProject.fullDescription}</p>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
              
              {selectedProject.budget && (
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="mb-3">Budget Information</h6>
                  <Row>
                    <Col md={6}>
                      <div className="detail-item">
                        <strong>Target:</strong> ${selectedProject.budget.target?.toLocaleString()}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="detail-item">
                        <strong>Raised:</strong> ${selectedProject.budget.raised?.toLocaleString()}
                      </div>
                    </Col>
                  </Row>
                  <div className="progress mt-3" style={{ height: "10px" }}>
                    <div 
                      className="progress-bar bg-success" 
                      style={{ 
                        width: `${(selectedProject.budget.raised / selectedProject.budget.target * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseProjectDetailModal}>Close</Button>
              {selectedProject.status === 'active' && (
                <Button 
                  variant="success" 
                  onClick={() => {
                    handleCloseProjectDetailModal();
                    setShowPaymentModal(true);
                  }}
                >
                  Support This Project
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        )}
      </Container>
      
      {/* M-Pesa Payment Modal */}
      <MpesaPaymentModal 
        show={showPaymentModal} 
        onHide={() => setShowPaymentModal(false)} 
      />
      
      <style jsx>{`
        .project-item {
          padding: 10px;
          margin: 5px 0;
          background: #f8f9fa;
          border-radius: 5px;
          border-left: 4px solid;
        }
        
        .projects-grid {
          max-height: 500px;
          overflow-y: auto;
        }
        
        .project-card-modal {
          transition: box-shadow 0.2s ease;
        }
        
        .project-card-modal:hover {
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}

export default Programs;