import { Container, Row, Col, Card } from "react-bootstrap";
import "./Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Mwangi",
      role: "Education Program Graduate",
      content: "Before ShareServe, I couldn't read or write. Today, I'm teaching other women in my village and running a small business. The education program changed not just my life, but our entire community's future.",
      image: "👩‍🎓"
    },
    {
      name: "John Kamau",
      role: "Healthcare Volunteer",
      content: "The health training I received from ShareServe helped me save my neighbor's life during childbirth. Now I volunteer at the local clinic, helping mothers and children get the care they deserve.",
      image: "👨‍⚕️"
    },
    {
      name: "Grace Njeri",
      role: "Livelihood Program Participant",
      content: "With just $50 from ShareServe's livelihood program, I started a poultry business. Today, I employ 3 people and can send all my children to school. This is more than money—it's dignity.",
      image: "👩‍💼"
    },
    {
      name: "David Ochieng",
      role: "Community Leader",
      content: "ShareServe didn't just give us aid; they taught us how to help ourselves. Our village now has clean water, a school, and a health clinic. We're building our own future, together.",
      image: "👨‍🌾"
    }
  ];

  return (
    <div className="testimonials-section">
      <Container>
        <h2 className="section-title text-center">Success Stories</h2>
        <p className="section-subtitle">
          Hear from the lives we've touched and the communities we've transformed
        </p>
        
        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className="testimonial-card h-100">
                <Card.Body className="text-center">
                  <div className="testimonial-avatar mb-3">
                    <span className="avatar-emoji">{testimonial.image}</span>
                  </div>
                  <Card.Text className="testimonial-content">
                    "{testimonial.content}"
                  </Card.Text>
                  <div className="testimonial-author mt-3">
                    <Card.Title as="h6" className="mb-1">{testimonial.name}</Card.Title>
                    <small className="text-muted">{testimonial.role}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Testimonials;
