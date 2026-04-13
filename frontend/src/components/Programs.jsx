import { Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Programs.css";

function Programs() {
  const [flippedCard, setFlippedCard] = useState(null);

  const programCategories = [
    {
      id: 'education',
      title: 'Education',
      icon: 'fas fa-graduation-cap',
      description: 'Empowering pupils and rural communities through educational programs and capacity building initiatives.',
      color: '#198754',
      image: '/images/education.jpg',
      link: '/education'
    },
    {
      id: 'livelihood',
      title: 'Livelihood',
      icon: 'fas fa-briefcase',
      description: 'Creating sustainable economic opportunities and skills development for community members.',
      color: '#F08000',
      image: '/images/livelihood.jpg',
      link: '/livelihood'
    },
    {
      id: 'environment',
      title: 'Environment',
      icon: 'fas fa-leaf',
      description: 'Environmental conservation and restoration through tree growing and climate action initiatives.',
      color: '#28a745',
      image: '/images/environment.jpg',
      link: '/environment'
    },
    {
      id: 'health',
      title: 'Health',
      icon: 'fas fa-heartbeat',
      description: 'Improving community health outcomes through accessible healthcare and health education programs.',
      color: '#dc3545',
      image: '/images/health.jpg',
      link: '/health'
    }
  ];

  const handleCardClick = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <div className="programs-section" id="programs">
      <Container>
        <h2 className="section-title text-center">Our Work</h2>
        <p className="section-subtitle text-center">
          Explore our four core program areas designed to create comprehensive community development
        </p>

        <Row className="g-4">
          {programCategories.map((category) => (
            <Col lg={3} md={6} className="mb-4" key={category.id}>
              <div 
                className={`flip-card ${flippedCard === category.id ? 'flipped' : ''}`}
                onClick={() => handleCardClick(category.id)}
              >
                <div className="flip-card-inner">
                  {/* Front - Image */}
                  <div 
                    className="flip-card-front"
                    style={{ 
                      backgroundColor: category.color,
                      backgroundImage: `linear-gradient(135deg, ${category.color}dd, ${category.color})`,
                    }}
                  >
                    <div className="flip-card-content">
                      <i className={`${category.icon} fa-4x mb-3`}></i>
                      <h3 className="flip-card-title">{category.title}</h3>
                      <p className="flip-card-hint">Click to learn more</p>
                    </div>
                  </div>
                  
                  {/* Back - Description */}
                  <div className="flip-card-back">
                    <div className="flip-card-content">
                      <h4 style={{ color: category.color }}>{category.title}</h4>
                      <p className="flip-card-description">
                        {category.description}
                      </p>
                      <Button 
                        as={Link}
                        to={category.link}
                        variant="outline-primary"
                        size="sm"
                        className="mt-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

      </Container>
    </div>
  );
}

export default Programs;