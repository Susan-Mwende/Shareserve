import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Community Health Initiative Launches in Rural Areas",
      date: "April 10, 2026",
      excerpt: "Our new mobile health clinics are bringing essential medical services to remote communities...",
      category: "Health",
      image: "/images/health.jpg"
    },
    {
      id: 2,
      title: "Education Program Reaches 1000 Students Milestone",
      date: "April 5, 2026",
      excerpt: "We're celebrating a major achievement as our education programs now support over 1000 students...",
      category: "Education",
      image: "/images/education.jpg"
    },
    {
      id: 3,
      title: "Tree Planting Campaign: 5000 Trees Planted",
      date: "March 28, 2026",
      excerpt: "Our environmental conservation efforts continue with a successful tree planting campaign...",
      category: "Environment",
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
                Blog & News
              </h1>
              <p className="text-center lead">
                Stay updated with our latest news, stories, and impact reports from the field.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {blogPosts.map((post) => (
              <Col lg={4} md={6} key={post.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={post.image}
                    alt={post.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">{post.date}</small>
                      <span className="badge bg-success">{post.category}</span>
                    </div>
                    <Card.Title className="h5">{post.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {post.excerpt}
                    </Card.Text>
                    <Button variant="outline-success" size="sm">
                      Read More
                    </Button>
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

export default Blog;
