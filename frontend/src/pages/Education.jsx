import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";

const activities = [
  { icon: "🎒", title: "Education Support", description: "We provide education levies, uniforms, and other essential materials to ensure children — especially in rural areas — can access and stay in school." },
  { icon: "🧠", title: "Mentorship and Mental Health", description: "We run mentorship programs pairing young people with positive role models, alongside mental health support to nurture well-rounded, resilient individuals." },
  { icon: "🏫", title: "School Leadership Empowerment Program", description: "We empower school leaders — teachers, heads, and student leaders — with the tools, training, and vision to drive transformative change within their schools and communities." },
];

function Education() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "80px", minHeight: "100vh", backgroundColor: "#f9fafb" }}>

        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #000428 0%, #004e92 100%)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "350px", height: "350px", borderRadius: "50%", border: "2px solid rgba(13,110,253,0.3)" }} />
          <Container style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <span style={{ display: "inline-block", background: "rgba(13,110,253,0.2)", border: "1px solid rgba(13,110,253,0.5)", color: "#93c5fd", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "50px", marginBottom: "1.5rem" }}>
              Our Work
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem" }}>
              <span style={{ color: "#93c5fd" }}>Education</span> Programs
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>
              Empowering learners and school communities with the support, mentorship, and leadership needed to thrive.
            </p>
          </Container>
        </div>

        <Container className="py-5">
          <Row className="g-4 mb-5 justify-content-center">
            {activities.map((a, i) => (
              <Col key={i} md={6} lg={4}>
                <div
                  style={{ background: "#fff", border: "2px solid #e5e7eb", borderRadius: "14px", padding: "2.5rem", height: "100%", transition: "all 0.25s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0d6efd"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(13,110,253,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{a.icon}</div>
                  <h5 style={{ color: "#0d6efd", fontWeight: 700, marginBottom: "0.75rem" }}>{a.title}</h5>
                  <p style={{ color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{a.description}</p>
                </div>
              </Col>
            ))}
          </Row>

          <Row>
            <Col className="text-center">
              <Link to="/" style={{ background: "transparent", color: "#0d6efd", padding: "0.6rem 1.5rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", border: "2px solid #0d6efd", marginRight: "1rem", display: "inline-block" }}>
                ← Back to Home
              </Link>
              <Link to="/partnership" style={{ background: "#0d6efd", color: "#fff", padding: "0.6rem 1.5rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                🤝 Get Involved
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Education;