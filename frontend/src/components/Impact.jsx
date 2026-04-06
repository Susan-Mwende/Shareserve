import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Impact.css";
import { API_ENDPOINTS } from "../config/api.js";

function Impact() {
  const [impactData, setImpactData] = useState({
    totalBeneficiaries: 0,
    totalSchools: 0,
    totalTrainings: 0,
    totalHouseholds: 0,
    recentProjects: []
  });
  
  const [displayData, setDisplayData] = useState({
    totalBeneficiaries: 0,
    totalSchools: 0,
    totalTrainings: 0,
    totalHouseholds: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const impactRef = useRef(null);

  // Counting animation function
  const animateCount = (start, end, duration, callback) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      callback(current);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Intersection Observer to trigger animation when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (impactRef.current) {
      observer.observe(impactRef.current);
    }

    return () => {
      if (impactRef.current) {
        observer.unobserve(impactRef.current);
      }
    };
  }, [isVisible]);

  // Start counting when component becomes visible
  useEffect(() => {
    if (isVisible && impactData.totalBeneficiaries > 0) {
      animateCount(0, impactData.totalBeneficiaries, 2000, (value) => {
        setDisplayData(prev => ({ ...prev, totalBeneficiaries: value }));
      });
      animateCount(0, impactData.totalSchools, 1500, (value) => {
        setDisplayData(prev => ({ ...prev, totalSchools: value }));
      });
      animateCount(0, impactData.totalTrainings, 1800, (value) => {
        setDisplayData(prev => ({ ...prev, totalTrainings: value }));
      });
      animateCount(0, impactData.totalHouseholds, 1600, (value) => {
        setDisplayData(prev => ({ ...prev, totalHouseholds: value }));
      });
    }
  }, [isVisible, impactData]);

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        // Fetch completed projects to calculate impact
        const programsResponse = await axios.get(API_ENDPOINTS.PROGRAMS);
        const programs = programsResponse.data;
        
        // Calculate totals
        const totalBeneficiaries = programs.reduce((sum, program) => sum + (program.beneficiaries || 0), 0);
        const totalSchools = programs.reduce((sum, program) => {
          return sum + (program.category === 'Education' ? 1 : 0);
        }, 0);
        const totalTrainings = programs.reduce((sum, program) => {
          return sum + (program.category === 'Health' ? 1 : 0);
        }, 0);
        const totalHouseholds = programs.reduce((sum, program) => {
          return sum + (program.category === 'Livelihood' ? 1 : 0);
        }, 0);

        // Get recent projects (last 4)
        const recentProjects = programs
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setImpactData({
          totalBeneficiaries,
          totalSchools,
          totalTrainings,
          totalHouseholds,
          recentProjects
        });
      } catch (error) {
        console.error("Error fetching impact data:", error);
      }
    };

    fetchImpactData();

  }, []);

  return (
    <div className="impact-section" ref={impactRef}>
      <Container>
        <h2 className="section-title text-center">Our Impact</h2>
        <p className="section-subtitle">
          Creating lasting change through our dedicated programs and community engagement
        </p>
        
        <Row className="g-4 mb-4">
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <div className="impact-number mb-3">
                  <h3 className="text-primary">{displayData.totalBeneficiaries.toLocaleString()}</h3>
                  <p className="text-muted">Beneficiaries Served</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <div className="impact-number mb-3">
                  <h3 className="text-success">{displayData.totalSchools.toLocaleString()}</h3>
                  <p className="text-muted">Schools Supported</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <div className="impact-number mb-3">
                  <h3 className="text-info">{displayData.totalTrainings.toLocaleString()}</h3>
                  <p className="text-muted">Trainings Delivered</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <div className="impact-number mb-3">
                  <h3 className="text-warning">{displayData.totalHouseholds.toLocaleString()}</h3>
                  <p className="text-muted">Households Empowered</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={12}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white">
                <Card.Title as="h3">Recent Projects</Card.Title>
              </Card.Header>
              <Card.Body>
                {impactData.recentProjects.length > 0 ? (
                  <Row>
                    {impactData.recentProjects.map((project, index) => (
                      <Col md={6} className="mb-3" key={project._id}>
                        <Card className="h-100 border-0">
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <h5 className="mb-1">{project.title}</h5>
                                <p className="text-muted small">
                                  {project.category} • {project.location}
                                </p>
                              </div>
                              <span className={`badge bg-${
                                project.status === 'active' ? 'success' : 
                                project.status === 'completed' ? 'primary' : 'warning'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-center text-muted">No completed projects available.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Impact;