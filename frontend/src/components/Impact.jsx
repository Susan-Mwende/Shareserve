import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Impact.css";
import { API_ENDPOINTS } from "../config/api.js";

function Impact() {
  const [impactData, setImpactData] = useState({
    greenClubs: 0,
    greenChampions: 0,
    communityAmbassadors: 0,
    fruitTrees: 0,
    indigenousTrees: 0,
    schools: 0,
    orchards: 0,
  });

  const [displayData, setDisplayData] = useState({
    greenClubs: 0,
    greenChampions: 0,
    communityAmbassadors: 0,
    fruitTrees: 0,
    indigenousTrees: 0,
    schools: 0,
    orchards: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const impactRef = useRef(null);

  const animateCount = (start, end, duration, callback) => {
    if (end === 0) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      callback(Math.floor(progress * (end - start) + start));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !isVisible) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (impactRef.current) observer.observe(impactRef.current);
    return () => { if (impactRef.current) observer.unobserve(impactRef.current); };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      Object.keys(impactData).forEach((key) => {
        animateCount(0, impactData[key], 2000, (value) => {
          setDisplayData((prev) => ({ ...prev, [key]: value }));
        });
      });
    }
  }, [isVisible, impactData]);

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.IMPACT);
        if (response.data) setImpactData(response.data);
      } catch (error) {
        // use default zeros
      }
    };
    fetchImpactData();
  }, []);

  const metrics = [
    { key: 'greenClubs',           label: 'Green Clubs Established',      color: '#198754', icon: '🌿' },
    { key: 'greenChampions',       label: 'Green Champions',               color: '#F08000', icon: '🏆' },
    { key: 'communityAmbassadors', label: 'Community Ambassadors',         color: '#0d6efd', icon: '🤝' },
    { key: 'fruitTrees',           label: 'Fruit Trees Planted',           color: '#198754', icon: '🍎' },
    { key: 'indigenousTrees',      label: 'Indigenous Trees Planted',      color: '#20c997', icon: '🌳' },
    { key: 'schools',              label: 'Schools Under Program',         color: '#6f42c1', icon: '🏫' },
    { key: 'orchards',             label: 'Orchards Established',          color: '#fd7e14', icon: '🌾' },
  ];

  return (
    <div className="impact-section" ref={impactRef}>
      <Container>
        <h2 className="section-title text-center">Our Impact</h2>
        <p className="section-subtitle text-center">
          Measuring the change we create — for communities, ecosystems, and future generations
        </p>

        <Row className="g-4 mb-5">
          {metrics.map(({ key, label, color, icon }) => (
            <Col md={3} sm={6} key={key}>
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body className="py-4">
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
                  <h3 style={{ color, fontWeight: 'bold', fontSize: '2.2rem' }}>
                    {displayData[key].toLocaleString()}
                  </h3>
                  <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{label}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md={8} className="text-center">
            <div className="p-4 rounded" style={{ backgroundColor: '#f8f9fa' }}>
              <h4 style={{ color: '#198754' }}>Want to learn more?</h4>
              <p className="text-muted mb-3">
                Read our annual reports, testimonials and full impact stories.
              </p>
              <Button as={Link} to="/impact-stories" variant="success" className="me-2">
                Impact Stories
              </Button>
              <Button as={Link} to="/testimonials" variant="outline-success">
                Testimonials
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Impact;