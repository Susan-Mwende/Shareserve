import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Programs.css";

function Programs() {
  const [flippedCard, setFlippedCard] = useState(null);

  const programCategories = [
    {
      id: 'environment',
      title: 'Environment & Climate Action',
      description: 'Training and awareness campaigns, establishment of Green Clubs and Demo Fruit Orchards, leadership development, tree planting and care, and conservation.',
      color: '#198754',
      image: '/images/education.jpg',
      link: '/environment'
    },
    {
      id: 'livelihood',
      title: 'Livelihood & Economic Empowerment',
      description: 'Fruit orchards, environment training, community environmental ambassadors, nursery establishment for income generation, clean cooking/energy campaigns, and VSLAs.',
      color: '#F08000',
      image: '/images/livelihood.jpg',
      link: '/livelihood'
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Education support including provision of education levies and uniforms, mentorship and mental health programs, and school leadership empowerment.',
      color: '#0d6efd',
      image: '/images/education.jpg',
      link: '/education'
    },
    ];

  const handleCardClick = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <div className="programs-section" id="programs">
      <Container>
        <h2 className="section-title text-center">Our Work</h2>
        <p className="section-subtitle text-center">
          Three core program areas designed to create lasting change for communities and ecosystems in rural Kenya
        </p>
        <Row className="g-4 justify-content-center">
          {programCategories.map((category) => (
            <Col lg={4} md={6} className="mb-4" key={category.id}>
              <div
                className={`flip-card ${flippedCard === category.id ? 'flipped' : ''}`}
                onClick={() => handleCardClick(category.id)}
              >
                <div className="flip-card-inner">
                  <div
                    className="flip-card-front"
                    style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div className="flip-card-overlay" style={{ backgroundColor: `${category.color}cc` }}>
                      <div className="flip-card-content">
                        <h3 className="flip-card-title">{category.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="flip-card-content">
                      <h4 style={{ color: category.color }}>{category.title}</h4>
                      <p className="flip-card-description">{category.description}</p>
                      <Button as={Link} to={category.link} variant="outline-primary" size="sm" onClick={(e) => e.stopPropagation()}>
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