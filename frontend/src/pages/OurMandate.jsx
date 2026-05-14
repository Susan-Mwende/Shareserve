import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";

const values = [
  { icon: "🌱", title: "Leadership", description: "We cultivate ethical, innovative, and action-oriented young leaders who drive transformative change in their communities and beyond." },
  { icon: "🤝", title: "Stewardship with Integrity", description: "Acting as responsible custodians of the resources while upholding honesty, transparency, and accountability." },
  { icon: "🌍", title: "Collaboration and Inclusivity", description: "We work with schools, communities, governments, and partners to achieve shared goals and amplify impact. We ensure that women, youth, and marginalized groups are central to climate and livelihood solutions." },
  { icon: "💡", title: "Empowerment", description: "We equip young people and communities with skills, knowledge, and opportunities to lead their own transformation." },
  { icon: "♻️", title: "Sustainability", description: "We prioritize solutions that are environmentally sound, economically viable and socially inclusive for lasting impact." },
];

function OurMandate() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "80px", minHeight: "100vh", backgroundColor: "#f9fafb" }}>

        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #000 0%, #0a1f0a 60%, #0f3020 100%)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "350px", height: "350px", borderRadius: "50%", border: "2px solid rgba(25,135,84,0.2)" }} />
          <Container style={{ position: "relative", zIndex: 1 }}>
            <div className="text-center">
              <span style={{ display: "inline-block", background: "rgba(25,135,84,0.15)", border: "1px solid rgba(25,135,84,0.4)", color: "#4ade80", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "50px", marginBottom: "1.5rem" }}>
                About Us
              </span>
              <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 900, color: "#ffffff", marginBottom: "1rem" }}>
                Our Mandate, <span style={{ color: "#198754" }}>Vision</span> & Values
              </h1>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>
                The core principles and commitments that guide our environmental mission
              </p>
            </div>
          </Container>
        </div>

        <Container className="py-5">

          {/* Mandate */}
          <Row className="mb-5">
            <Col>
              <div style={{ background: "#000", borderRadius: "16px", padding: "3rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎯</div>
                <h2 style={{ color: "#198754", fontWeight: 800, marginBottom: "1rem" }}>Our Mandate</h2>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", lineHeight: 1.9, margin: 0 }}>
                  Raising Environmental Champions who will provide transformative leadership in climate action,
                  advocating for protection, conservation, restoration and regeneration of our Ecosystems.
                </p>
              </div>
            </Col>
          </Row>

          {/* Vision */}
          <Row className="mb-5">
            <Col>
              <div style={{ background: "#198754", borderRadius: "16px", padding: "3rem" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔭</div>
                <h2 style={{ color: "#ffffff", fontWeight: 800, marginBottom: "1rem" }}>Vision Statement</h2>
                <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "1.1rem", lineHeight: 1.9, margin: 0 }}>
                  A world where empowered communities live in harmony with nature, leading climate action
                  that sustains livelihoods, protects ecosystems, and inspires future generations to thrive.
                </p>
              </div>
            </Col>
          </Row>

          {/* Values */}
          <Row className="mb-3">
            <Col className="text-center">
              <h2 style={{ color: "#111827", fontWeight: 800, marginBottom: "0.5rem" }}>Our Values</h2>
              <p style={{ color: "#6b7280", marginBottom: "2.5rem" }}>The principles that guide everything we do</p>
            </Col>
          </Row>
          <Row className="g-4 mb-5">
            {values.map((v, i) => (
              <Col key={i} md={4} sm={6}>
                <div
                  style={{ background: "#fff", border: "2px solid #e5e7eb", borderRadius: "14px", padding: "2rem", height: "100%", transition: "all 0.25s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#198754"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(25,135,84,0.12)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{v.icon}</div>
                  <h5 style={{ color: "#198754", fontWeight: 700, marginBottom: "0.6rem" }}>{v.title}</h5>
                  <p style={{ color: "#4b5563", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{v.description}</p>
                </div>
              </Col>
            ))}
          </Row>

        </Container>
      </div>
      <Footer />
    </>
  );
}

export default OurMandate;