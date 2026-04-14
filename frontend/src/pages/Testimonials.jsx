import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Mary Wanjiku",
      role: "Beneficiary, Education Program",
      location: "Kiambu County",
      quote: "ShareServe's education program changed my life. I received a scholarship that allowed me to complete my studies and now I'm teaching in my community.",
      image: "/images/education.jpg"
    },
    {
      id: 2,
      name: "John Ochieng",
      role: "Farmer, Livelihood Program",
      location: "Kisumu County",
      quote: "The training I received through the livelihood program helped me improve my farming techniques. My crop yield has doubled and I can now support my family better.",
      image: "/images/livelihood.jpg"
    },
    {
      id: 3,
      name: "Grace Muthoni",
      role: "Community Health Worker",
      location: "Nairobi County",
      quote: "The health camps organized by ShareServe have made healthcare accessible to many in our community. I'm proud to be part of this initiative.",
      image: "/images/health.jpg"
    },
    {
      id: 4,
      name: "Peter Kamau",
      role: "Environmental Volunteer",
      location: "Nakuru County",
      quote: "Planting trees with ShareServe has been a rewarding experience. We've seen our community transform as we restore the environment together.",
      image: "/images/environment.jpg"
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
                Testimonials
              </h1>
              <p className="text-center lead">
                Hear from the people whose lives have been transformed by our programs.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {testimonials.map((testimonial) => (
              <Col lg={6} key={testimonial.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      />
                      <div>
                        <Card.Title className="h5 mb-1">{testimonial.name}</Card.Title>
                        <small className="text-muted d-block">{testimonial.role}</small>
                        <small className="text-muted">
                          <i className="fas fa-map-marker-alt me-1"></i>
                          {testimonial.location}
                        </small>
                      </div>
                    </div>
                    <Card.Text className="text-muted flex-grow-1" style={{ fontStyle: "italic" }}>
                      <i className="fas fa-quote-left me-2 text-success"></i>
                      {testimonial.quote}
                      <i className="fas fa-quote-right ms-2 text-success"></i>
                    </Card.Text>
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

export default Testimonials;
