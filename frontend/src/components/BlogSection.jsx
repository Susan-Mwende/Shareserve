import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Education Program Reaches 1000 Students Milestone",
      date: "April 5, 2026",
      preview: "We are celebrating a major achievement as our education programs now support over 1000 students across rural Kenya...",
      category: "Education",
      image: "/images/education.jpg",
      link: "/blog/education-milestone"
    },
    {
      id: 2,
      title: "Tree Planting Campaign: 5000 Trees Planted",
      date: "March 28, 2026",
      preview: "Our environmental conservation efforts have achieved remarkable success with the planting of 5000 trees across degraded landscapes...",
      category: "Environment",
      image: "/src/assets/carousel1.jpeg",
      link: "/blog/tree-planting-campaign"
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
              <Link to={post.link} style={{ textDecoration: 'none' }}>
                <Card className="h-100 shadow-sm" style={{ cursor: 'pointer' }}>
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
                    <Card.Title className="h5" style={{ color: '#333' }}>{post.title}</Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {post.preview}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

      </Container>
    </div>
  );
}

export default BlogSection;
