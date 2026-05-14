import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import aboutImage from "../assets/small baby.jpeg";
import gardenImage from "../assets/garden.jpg";
import "./About.css";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

const defaultValues = [
  {
    icon: "🌱",
    title: "Leadership",
    description:
      "We cultivate ethical, innovative, and action-oriented young leaders who drive transformative change in their communities and beyond.",
  },
  {
    icon: "🤝",
    title: "Stewardship with Integrity",
    description:
      "Acting as responsible custodians of the resources while upholding honesty, transparency, and accountability.",
  },
  {
    icon: "🌍",
    title: "Collaboration & Inclusivity",
    description:
      "We work with schools, communities, governments, and partners to achieve shared goals. We ensure that women, youth, and marginalized groups are central to climate and livelihood solutions.",
  },
  {
    icon: "💡",
    title: "Empowerment",
    description:
      "We equip young people and communities with skills, knowledge, and opportunities to lead their own transformation.",
  },
  {
    icon: "♻️",
    title: "Sustainability",
    description:
      "We prioritize solutions that are environmentally sound, economically viable and socially inclusive for lasting impact.",
  },
];

const defaultTeam = [
  {
    department: "Programs",
    color: "#198754",
    members: [
      { role: "Senior Director – Programs", icon: "👩‍💼" },
      { role: "Programs Manager", icon: "👨‍💼" },
    ],
  },
  {
    department: "Operations",
    color: "#0d6efd",
    members: [
      { role: "Senior Director – Operations", icon: "👩‍💼" },
      { role: "Operations Manager", icon: "👨‍💼" },
    ],
  },
];

function About() {
  const [values] = useState(defaultValues);
  const [team] = useState(defaultTeam);

  return (
    <div id="about" className="mb-5">
      <Container className="mt-5">
        {/* ── Who We Are ── */}
        <Row className="align-items-center mb-5 g-5">
          <Col md={6}>
            <div className="about-content">
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(25,135,84,0.12)",
                  border: "1px solid rgba(25,135,84,0.35)",
                  color: "#198754",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "5px 14px",
                  borderRadius: "50px",
                  marginBottom: "1rem",
                }}
              >
                🌿 Who We Are
              </span>
              <h2 className="mb-3" style={{ color: "#111827", fontWeight: 800 }}>
                About <span style={{ color: "#198754" }}>ShareServe</span> International
              </h2>
              <p className="lead mb-4" style={{ color: "#4b5563", lineHeight: 1.8 }}>
                Shareserve International is a mission driven organization working
                in rural Kenya to address environmental degradation and economic
                vulnerability through youth empowerment and sustainable solutions.
              </p>

              <div
                style={{
                  background: "#f0fdf4",
                  border: "2px solid #bbf7d0",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h5 style={{ color: "#198754", fontWeight: 700 }}>🌏 Our Foundation</h5>
                <p style={{ color: "#374151", lineHeight: 1.8, margin: 0 }}>
                  We believe the earth was created with abundance and balance,
                  entrusted to humanity's care, and that we share a responsibility
                  to protect and restore it for present and future generations.
                </p>
              </div>

              <Link
                to="/about-full"
                style={{
                  display: "inline-block",
                  background: "#198754",
                  color: "#ffffff",
                  padding: "0.65rem 1.6rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                Learn More About Us →
              </Link>
            </div>
          </Col>

          <Col md={6}>
            <div style={{ position: "relative" }}>
              <img
                src={aboutImage}
                alt="ShareServe community empowerment"
                className="img-fluid rounded shadow"
                style={{
                  width: "100%",
                  height: "420px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "-20px",
                  background: "#198754",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "12px 20px",
                  boxShadow: "0 8px 24px rgba(25,135,84,0.4)",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                🌱 Empowering Rural Kenya
              </div>
            </div>
          </Col>
        </Row>

        {/* ── Mandate & Vision ── */}
        <Row className="g-4 mb-5">
          <Col md={6}>
            <div style={{ background: "#000000", borderRadius: "16px", padding: "2.5rem", height: "100%" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>🎯</div>
              <h4 style={{ color: "#198754", fontWeight: 800, marginBottom: "1rem" }}>Our Mandate</h4>
              <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.8, margin: 0 }}>
                Raising Environmental Champions who will provide transformative
                leadership in climate action, advocating for protection,
                conservation, restoration and regeneration of our Ecosystems.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div style={{ background: "#198754", borderRadius: "16px", padding: "2.5rem", height: "100%" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>🔭</div>
              <h4 style={{ color: "#ffffff", fontWeight: 800, marginBottom: "1rem" }}>Vision Statement</h4>
              <p style={{ color: "rgba(255,255,255,0.92)", lineHeight: 1.8, margin: 0 }}>
                A world where empowered communities live in harmony with nature,
                leading climate action that sustains livelihoods, protects
                ecosystems, and inspires future generations to thrive.
              </p>
            </div>
          </Col>
        </Row>

        {/* ── Values ── */}
        <Row className="mb-5">
          <Col>
            <h3 style={{ color: "#111827", fontWeight: 800, textAlign: "center", marginBottom: "2rem" }}>
              Our Values
            </h3>
            <Row className="g-4">
              {values.map((v, i) => (
                <Col key={i} md={4} sm={6}>
                  <div
                    style={{
                      background: "#ffffff",
                      border: "2px solid #e5e7eb",
                      borderRadius: "14px",
                      padding: "1.8rem",
                      height: "100%",
                      transition: "all 0.25s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#198754";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(25,135,84,0.12)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{v.icon}</div>
                    <h6 style={{ color: "#198754", fontWeight: 700, marginBottom: "0.6rem" }}>{v.title}</h6>
                    <p style={{ color: "#4b5563", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>
                      {v.description}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* ── Meet Our Team ── */}
        <Row className="mb-5">
          <Col>
            <h3 style={{ color: "#111827", fontWeight: 800, textAlign: "center", marginBottom: "0.5rem" }}>
              Meet Our Team
            </h3>
            <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem" }}>
              Dedicated professionals driving our environmental mission
            </p>
            <Row className="g-4 justify-content-center">
              {team.map((dept, i) => (
                <Col key={i} md={5}>
                  <div style={{ border: `2px solid ${dept.color}`, borderRadius: "14px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                    <div style={{ background: dept.color, padding: "1rem 1.5rem" }}>
                      <h5 style={{ color: "#ffffff", fontWeight: 700, margin: 0 }}>{dept.department}</h5>
                    </div>
                    {dept.members.map((m, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "1rem 1.5rem",
                          borderBottom: j < dept.members.length - 1 ? "1px solid #e5e7eb" : "none",
                          background: "#ffffff",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            background: `${dept.color}18`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "1.3rem",
                            flexShrink: 0,
                          }}
                        >
                          {m.icon}
                        </div>
                        <span style={{ color: "#111827", fontWeight: 600, fontSize: "0.95rem" }}>{m.role}</span>
                      </div>
                    ))}
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        {/* ── Garden image strip ── */}
        <Row className="mb-5">
          <Col>
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden" }}>
              <img
                src={gardenImage}
                alt="ShareServe garden and environmental work"
                style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 100%)",
                  display: "flex",
                  alignItems: "center",
                  padding: "2.5rem",
                }}
              >
                <div>
                  <h3 style={{ color: "#fff", fontWeight: 800, marginBottom: "0.5rem" }}>
                    Ready to make a difference?
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.2rem" }}>
                    Join us in our mission to protect Kenya's ecosystems and empower communities.
                  </p>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <Link to="/partnership" style={{ background: "#198754", color: "#fff", padding: "0.6rem 1.4rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
                      🤝 Partner With Us
                    </Link>
                    <Link to="/contact" style={{ background: "transparent", color: "#fff", padding: "0.6rem 1.4rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", border: "2px solid rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
                      📧 Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;