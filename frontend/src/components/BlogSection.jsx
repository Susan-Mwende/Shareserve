import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function BlogSection() {
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
    <div className="py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="text-center" style={{ color: "#198754" }}>
              Latest News & Blog
            </h2>
            <p className="text-center lead">
              Stay updated with our latest stories and impact reports
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <Button 
              as={Link} 
              to="/blog" 
              variant="outline-success"
            >
              View All Blog Posts
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BlogSection;
