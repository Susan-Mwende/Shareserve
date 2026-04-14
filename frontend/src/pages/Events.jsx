import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Charity Run",
      date: "May 15, 2026",
      time: "8:00 AM - 12:00 PM",
      location: "Nairobi, Kenya",
      description: "Join us for our annual charity run to raise funds for education programs.",
      image: "/images/education.jpg"
    },
    {
      id: 2,
      title: "Tree Planting Day",
      date: "June 5, 2026",
      time: "9:00 AM - 3:00 PM",
      location: "Kiambu County",
      description: "Help us plant 1000 trees in partnership with local communities.",
      image: "/images/environment.jpg"
    },
    {
      id: 3,
      title: "Health Camp",
      date: "July 10, 2026",
      time: "10:00 AM - 4:00 PM",
      location: "Rural Health Center",
      description: "Free medical checkups and health education for community members.",
      image: "/images/health.jpg"
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Community Skills Workshop",
      date: "March 20, 2026",
      description: "Successfully trained 50 community members in various vocational skills."
    },
    {
      id: 5,
      title: "Fundraising Gala",
      date: "February 14, 2026",
      description: "Raised funds to support our livelihood programs."
    }
  ];

  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "76px" }}>
        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <h1 className="text-center" style={{ color: "#198754" }}>
                Events
              </h1>
              <p className="text-center lead">
                Join us at our upcoming events or view our past activities.
              </p>
            </Col>
          </Row>

          <h3 className="mb-4" style={{ color: "#198754" }}>Upcoming Events</h3>
          <Row className="g-4 mb-5">
            {upcomingEvents.map((event) => (
              <Col lg={4} md={6} key={event.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={event.image}
                    alt={event.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="h5">{event.title}</Card.Title>
                    <div className="mb-2">
                      <small className="text-muted d-block">
                        <i className="fas fa-calendar me-2"></i>
                        {event.date}
                      </small>
                      <small className="text-muted d-block">
                        <i className="fas fa-clock me-2"></i>
                        {event.time}
                      </small>
                      <small className="text-muted d-block">
                        <i className="fas fa-map-marker-alt me-2"></i>
                        {event.location}
                      </small>
                    </div>
                    <Card.Text className="text-muted">
                      {event.description}
                    </Card.Text>
                    <Button variant="outline-success" size="sm">
                      Register Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <h3 className="mb-4" style={{ color: "#198754" }}>Past Events</h3>
          <Row className="g-4">
            {pastEvents.map((event) => (
              <Col lg={6} key={event.id}>
                <Card className="shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Card.Title className="h5">{event.title}</Card.Title>
                        <small className="text-muted">{event.date}</small>
                        <Card.Text className="mt-2 text-muted">
                          {event.description}
                        </Card.Text>
                      </div>
                      <span className="badge bg-secondary">Completed</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-5">
            <Col className="text-center">
              <Button 
                as={Link} 
                to="/" 
                variant="outline-success"
              >
                <i className="fas fa-arrow-left me-2"></i>
                Back to Home
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Events;
