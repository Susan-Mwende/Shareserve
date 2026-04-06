import { useState } from "react";
import { Carousel, Card, Button } from "react-bootstrap";
import "./Programs.css";

const ProjectCarousel = ({ projects, title, icon, iconColor }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Health: "fas fa-heartbeat",
      Education: "fas fa-graduation-cap",
      Livelihood: "fas fa-briefcase",
      Environment: "fas fa-leaf"
    };
    return icons[category] || "fas fa-tasks";
  };

  const getStatusBadge = (status) => {
    const variant = {
      active: "success",
      planning: "warning", 
      completed: "primary"
    }[status];
    return <span className={`badge bg-${variant} ms-2`}>{status}</span>;
  };

  if (projects.length === 0) return null;

  return (
    <div className="project-carousel-section mb-5">
      <h3 className="section-subtitle mb-4">
        <i className={`${icon} ${iconColor} me-2`}></i>
        {title}
      </h3>
      
      <Carousel 
        activeIndex={index} 
        onSelect={handleSelect} 
        interval={4000}
        controls={true}
        indicators={true}
        className="project-carousel"
        prevIcon={<span className="carousel-control-prev-icon">❮</span>}
        nextIcon={<span className="carousel-control-next-icon">❯</span>}
      >
        {projects.map((project) => (
          <Carousel.Item key={project._id}>
            <div className="carousel-project-container">
              <Card className="project-carousel-card h-100">
                {/* IMAGE SECTION */}
                <div className="carousel-project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-100 h-100"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>

                <Card.Body className="carousel-project-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <Card.Title className="mb-2">{project.title}</Card.Title>
                      <div className="d-flex align-items-center mb-2">
                        <i className={`${getCategoryIcon(project.category)} me-2`}></i>
                        <span className="badge bg-secondary ms-2">{project.category}</span>
                      </div>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                  
                  <Card.Text className="project-description">
                    {project.description}
                  </Card.Text>
                  
                  <div className="d-flex gap-2">
                    <Button 
                      variant="success" 
                      size="sm" 
                      onClick={() => window.open(`/project/${project._id}`, '_blank')}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={() => window.open(`/donate/${project._id}`, '_blank')}
                    >
                      Support
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProjectCarousel;
