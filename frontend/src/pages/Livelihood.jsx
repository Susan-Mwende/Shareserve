import { Container, Row, Col, Card, Button, Badge, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";
import { API_ENDPOINTS } from "../config/api.js";
import livelihoodImage from "../assets/livelihood.jpg";
import heroImage from "../assets/hero.jpg";
import gardenImage from "../assets/garden.jpg";

function Livelihood() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [householdsCount, setHouseholdsCount] = useState(0);
  const [vslaCount, setVslaCount] = useState(0);
  const [orchardsCount, setOrchardsCount] = useState(0);
  const [trainedCount, setTrainedCount] = useState(0);
  const impactRef = useRef(null);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselImages = [
    livelihoodImage,
    heroImage,
    gardenImage
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (impactRef.current) {
      observer.observe(impactRef.current);
    }

    return () => {
      if (impactRef.current) {
        observer.unobserve(impactRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const animateValue = (start, end, duration, setter) => {
      const startTime = Date.now();
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(start + (end - start) * progress);
        setter(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    animateValue(0, 500, 2000, setHouseholdsCount);
    animateValue(0, 50, 1500, setVslaCount);
    animateValue(0, 30, 1000, setOrchardsCount);
    animateValue(0, 2000, 1800, setTrainedCount);
  };

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
          <Carousel 
            activeIndex={index} 
            onSelect={handleSelect} 
            interval={3000}
            controls={true}
            indicators={true}
            style={{ height: "100%" }}
          >
            {carouselImages.map((image, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={image}
                  alt={`Livelihood ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, rgba(240, 128, 0, 0.3) 0%, rgba(255, 107, 53, 0.3) 100%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Container>
              <Row className="align-items-center">
                <Col lg={12} className="text-center text-white">
                  <h1 className="display-4 fw-bold mb-4">
                    Livelihood & Economic Empowerment
                  </h1>
                  <p className="lead mb-0">
                    Creating sustainable economic opportunities and empowering communities
                    through skills development, entrepreneurship, and financial inclusion.
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
              <h2 className="text-center mb-5" style={{ color: "#F08000" }}>
                Our Key Initiatives
              </h2>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card 
                className="h-100 text-center border-0 shadow-sm initiative-card"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#F08000",
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    🌳
                  </div>
                  <h5>Fruit Orchards</h5>
                  <p className="text-muted">
                    Establishing sustainable food sources and income generation
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card 
                className="h-100 text-center border-0 shadow-sm initiative-card"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#F08000",
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    🏫
                  </div>
                  <h5>Environmental Training</h5>
                  <p className="text-muted">
                    Building awareness and capacity for sustainable practices
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card 
                className="h-100 text-center border-0 shadow-sm initiative-card"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#F08000",
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    👥
                  </div>
                  <h5>Community Ambassadors</h5>
                  <p className="text-muted">
                    Empowering local environmental champions
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card 
                className="h-100 text-center border-0 shadow-sm initiative-card"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "1rem",
                      color: "#F08000",
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    💵
                  </div>
                  <h5>VSLA Groups</h5>
                  <p className="text-muted">
                    Village savings and loan associations for financial inclusion
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
          <Row id="impact" className="mt-5 mb-5" ref={impactRef}>
            <Col lg={12}>
              <h2 className="text-center mb-5" style={{ color: "#F08000" }}>
                Our Economic Impact
              </h2>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="text-center border-0 shadow-sm bg-warning text-dark">
                <Card.Body>
                  <h2 className="fw-bold">{householdsCount}+</h2>
                  <p>Households Empowered</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="text-center border-0 shadow-sm bg-info text-white">
                <Card.Body>
                  <h2 className="fw-bold">{vslaCount}</h2>
                  <p>VSLA Groups Formed</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="text-center border-0 shadow-sm bg-success text-white">
                <Card.Body>
                  <h2 className="fw-bold">{orchardsCount}</h2>
                  <p>Orchards Established</p>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="text-center border-0 shadow-sm bg-primary text-white">
                <Card.Body>
                  <h2 className="fw-bold">{trainedCount.toLocaleString()}+</h2>
                  <p>People Trained</p>
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
                  background: "linear-gradient(135deg, #F08000 0%, #ff6b35 100%)",
                  color: "white",
                }}
              >
                <Card.Body className="p-5">
                  <h2 className="mb-3">Empower Economic Transformation</h2>
                  <p className="lead mb-4">
                    Join us in creating sustainable livelihoods and breaking the cycle
                    of poverty. Your support helps families build better futures.
                  </p>
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Button variant="light" size="lg">
                      💼 Support Skills Training
                    </Button>
                    <Button as={Link} to="/contact" variant="outline-light" size="lg">
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

export default Livelihood;
