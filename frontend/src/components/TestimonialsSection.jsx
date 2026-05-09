import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function TestimonialsSection() {
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
      quote: "The training I received through the livelihood program helped me improve my farming techniques. My crop yield has doubled!",
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
    <div className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="text-center" style={{ color: "#198754" }}>
              What People Say
            </h2>
            <p className="text-center lead">
              Hear from those whose lives we've touched
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <Carousel interval={5000} indicators={true} controls={true}>
              {testimonials.map((testimonial) => (
                <Carousel.Item key={testimonial.id}>
                  <Card className="shadow-sm border-0">
                    <Card.Body className="p-4 text-center">
                      <div className="mb-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="rounded-circle"
                          style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        />
                      </div>
                      <Card.Title className="h4 mb-1">{testimonial.name}</Card.Title>
                      <small className="text-muted d-block mb-2">{testimonial.role}</small>
                      <small className="text-muted d-block mb-3">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        {testimonial.location}
                      </small>
                      <Card.Text className="text-muted fst-italic px-md-4">
                        <i className="fas fa-quote-left me-2 text-success"></i>
                        {testimonial.quote}
                        <i className="fas fa-quote-right ms-2 text-success"></i>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Button 
              as={Link} 
              to="/testimonials" 
              variant="outline-success"
            >
              Read More Testimonials
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TestimonialsSection;
