import { Container, Row, Col, Card } from "react-bootstrap";

function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: "Community Health Initiative Launches in Rural Areas",
      date: "April 10, 2026",
      excerpt: "Our new mobile health clinics are bringing essential medical services to remote communities that have historically lacked access to quality healthcare. Through partnerships with local health workers and international medical volunteers, we have established three mobile clinics that travel to underserved villages twice weekly. These clinics provide maternal health services, childhood vaccinations, malaria prevention and treatment, and health education to over 500 families. Community health workers have been trained to provide follow-up care and health education, ensuring sustainable impact. This initiative represents our commitment to health equity and our belief that every person deserves access to medical care regardless of their location or economic status.",
      category: "Health",
      image: "/images/health.jpg"
    },
    {
      id: 2,
      title: "Education Program Reaches 1000 Students Milestone",
      date: "April 5, 2026",
      excerpt: "We are celebrating a major achievement as our education programs now support over 1000 students across rural Kenya. Through scholarships, school supplies, mentorship programs, and infrastructure improvements, we have helped children stay in school and pursue their dreams. Our holistic approach includes not only academic support but also mental health counseling, leadership training, and extracurricular activities that build confidence and life skills. Teachers in partner schools have received professional development training, and parents are engaged through community education workshops. This milestone represents countless hours of dedication from our team, volunteers, and community partners who share our vision of an educated, empowered generation that will lead Kenya into a brighter future.",
      category: "Education",
      image: "/images/education.jpg"
    },
    {
      id: 3,
      title: "Tree Planting Campaign: 5000 Trees Planted",
      date: "March 28, 2026",
      excerpt: "Our environmental conservation efforts have achieved remarkable success with the planting of 5000 trees across degraded landscapes in rural communities. This ambitious campaign engaged over 300 community members, including youth groups, women's associations, and school environmental clubs. The trees planted include indigenous species that restore biodiversity, fruit trees that provide food security and income, and fast-growing species for fuelwood to reduce pressure on natural forests. Beyond planting, we have established community nurseries for sustainable tree propagation and trained local caretakers in forest management. This initiative directly combats climate change, prevents soil erosion, restores water catchments, and creates green spaces that improve community wellbeing. Our commitment to environmental stewardship continues as we aim to plant 10,000 more trees in the coming year.",
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

      </Container>
    </div>
  );
}

export default BlogSection;
