import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
