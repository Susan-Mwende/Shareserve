import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import aboutImage from "../assets/livelihood.jpg";
import "./AboutPage.css";
import MpesaPaymentModal from "../components/MpesaPaymentModal.jsx";

const values = [
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
      "Acting as responsible custodians of resources while upholding honesty, transparency, and accountability in everything we do.",
  },
  {
    icon: "🌍",
    title: "Collaboration & Inclusivity",
    description:
      "We work with schools, communities, governments, and partners to achieve shared goals — ensuring women, youth, and marginalized groups are central to climate and livelihood solutions.",
  },
  {
    icon: "💡",
    title: "Empowerment",
    description:
      "We equip young people and communities with the skills, knowledge, and opportunities to lead their own transformation.",
  },
  {
    icon: "♻️",
    title: "Sustainability",
    description:
      "We prioritize solutions that are environmentally sound, economically viable, and socially inclusive for lasting impact.",
  },
];

const team = [
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

function AboutPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <div className="about-page">
        {/* ── Hero ── */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #000000 0%, #0a1f0a 60%, #0f3020 100%)",
            padding: "5rem 0 4rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* decorative rings */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              border: "2px solid rgba(25,135,84,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-50px",
              left: "8%",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              border: "2px solid rgba(25,135,84,0.12)",
            }}
          />

          <Container style={{ position: "relative", zIndex: 1 }}>
            <Row className="align-items-center g-5">
              <Col md={6}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(25,135,84,0.15)",
                    border: "1px solid rgba(25,135,84,0.4)",
                    color: "#4ade80",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "6px 16px",
                    borderRadius: "50px",
                    marginBottom: "1.5rem",
                  }}
                >
                  Who We Are
                </div>

                <h1
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                    fontWeight: 900,
                    color: "#ffffff",
                    lineHeight: 1.15,
                    marginBottom: "1.2rem",
                  }}
                >
                  Raising{" "}
                  <span style={{ color: "#198754" }}>Environmental</span>{" "}
                  Champions
                </h1>

                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "rgba(255,255,255,0.78)",
                    lineHeight: 1.8,
                    marginBottom: "1.8rem",
                  }}
                >
                  ShareServe International is a mission-driven organization
                  working in rural Kenya to address environmental degradation and
                  economic vulnerability through youth empowerment and
                  sustainable solutions.
                </p>

                <Link
                  to="/"
                  style={{
                    background: "transparent",
                    color: "#ffffff",
                    padding: "0.75rem 1.6rem",
                    borderRadius: "8px",
                    fontWeight: 600,
                    textDecoration: "none",
                    border: "2px solid rgba(255,255,255,0.3)",
                    fontSize: "0.9rem",
                    display: "inline-block",
                  }}
                >
                  ← Back to Home
                </Link>
              </Col>

              <Col md={6}>
                <img
                  src={aboutImage}
                  alt="ShareServe community development"
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                  }}
                />
              </Col>
            </Row>
          </Container>
        </div>

        <Container className="py-5">

          {/* ── Foundation ── */}
          <Row className="mb-5">
            <Col>
              <div
                style={{
                  background: "#f0fdf4",
                  border: "2px solid #bbf7d0",
                  borderRadius: "16px",
                  padding: "3rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🌿</div>
                <h2
                  style={{
                    color: "#198754",
                    fontWeight: 800,
                    marginBottom: "1rem",
                  }}
                >
                  Our Foundation
                </h2>
                <p
                  style={{
                    fontSize: "1.1rem",
                    color: "#374151",
                    lineHeight: 1.8,
                    maxWidth: "680px",
                    margin: "0 auto",
                  }}
                >
                  We believe the earth was created with abundance and balance,
                  entrusted to humanity's care, and that we share a
                  responsibility to protect and restore it for present and
                  future generations.
                </p>
              </div>
            </Col>
          </Row>

          {/* ── Mandate & Vision ── */}
          <Row className="g-4 mb-5">
            <Col md={6}>
              <div
                style={{
                  background: "#000000",
                  borderRadius: "16px",
                  padding: "2.5rem",
                  height: "100%",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎯</div>
                <h3
                  style={{
                    color: "#198754",
                    fontWeight: 800,
                    marginBottom: "1rem",
                  }}
                >
                  Our Mandate
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    lineHeight: 1.8,
                    fontSize: "0.98rem",
                  }}
                >
                  Raising Environmental Champions who will provide
                  transformative leadership in climate action, advocating for
                  the protection, conservation, restoration, and regeneration of
                  our ecosystems.
                </p>
              </div>
            </Col>

            <Col md={6}>
              <div
                style={{
                  background: "#198754",
                  borderRadius: "16px",
                  padding: "2.5rem",
                  height: "100%",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔭</div>
                <h3
                  style={{
                    color: "#ffffff",
                    fontWeight: 800,
                    marginBottom: "1rem",
                  }}
                >
                  Our Vision
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    lineHeight: 1.8,
                    fontSize: "0.98rem",
                  }}
                >
                  A world where empowered communities live in harmony with
                  nature, leading climate action that sustains livelihoods,
                  protects ecosystems, and inspires future generations to
                  thrive.
                </p>
              </div>
            </Col>
          </Row>

          {/* ── Values ── */}
          <Row className="mb-5">
            <Col>
              <h2
                style={{
                  color: "#111827",
                  fontWeight: 800,
                  textAlign: "center",
                  marginBottom: "2.5rem",
                }}
              >
                Our Values
              </h2>
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
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#198754";
                        e.currentTarget.style.boxShadow =
                          "0 10px 30px rgba(25,135,84,0.12)";
                        e.currentTarget.style.transform = "translateY(-4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>
                        {v.icon}
                      </div>
                      <h5
                        style={{
                          color: "#198754",
                          fontWeight: 700,
                          marginBottom: "0.6rem",
                        }}
                      >
                        {v.title}
                      </h5>
                      <p
                        style={{
                          color: "#4b5563",
                          fontSize: "0.9rem",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {v.description}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          {/* ── Team ── */}
          <Row className="mb-5">
            <Col>
              <h2
                style={{
                  color: "#111827",
                  fontWeight: 800,
                  textAlign: "center",
                  marginBottom: "0.5rem",
                }}
              >
                Meet Our Team
              </h2>
              <p
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                  marginBottom: "2.5rem",
                }}
              >
                Dedicated professionals driving our mission forward.
              </p>

              <Row className="g-4 justify-content-center">
                {team.map((dept, i) => (
                  <Col key={i} md={5}>
                    <div
                      style={{
                        border: `2px solid ${dept.color}`,
                        borderRadius: "14px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          background: dept.color,
                          padding: "1rem 1.5rem",
                        }}
                      >
                        <h5
                          style={{
                            color: "#ffffff",
                            fontWeight: 700,
                            margin: 0,
                          }}
                        >
                          {dept.department}
                        </h5>
                      </div>
                      {dept.members.map((m, j) => (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            padding: "1rem 1.5rem",
                            borderBottom:
                              j < dept.members.length - 1
                                ? "1px solid #e5e7eb"
                                : "none",
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
                          <span
                            style={{
                              color: "#111827",
                              fontWeight: 600,
                              fontSize: "0.95rem",
                            }}
                          >
                            {m.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          {/* ── CTA ── */}
          <Row>
            <Col>
              <div
                style={{
                  background: "#000000",
                  borderRadius: "16px",
                  padding: "3.5rem",
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    color: "#ffffff",
                    fontWeight: 800,
                    marginBottom: "1rem",
                  }}
                >
                  Get Involved
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "1rem",
                    maxWidth: "480px",
                    margin: "0 auto 2rem",
                    lineHeight: 1.7,
                  }}
                >
                  Join us in our mission to create sustainable change in
                  communities across Kenya.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => setShowPaymentModal(true)}
                    style={{ fontWeight: 700 }}
                  >
                    🤝 Donate Now
                  </Button>
                  <Link
                    to="/contact"
                    style={{
                      background: "transparent",
                      color: "#ffffff",
                      padding: "0.6rem 1.6rem",
                      borderRadius: "8px",
                      fontWeight: 700,
                      textDecoration: "none",
                      border: "2px solid rgba(255,255,255,0.3)",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    📧 Contact Us
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <MpesaPaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
      />
    </>
  );
}

export default AboutPage;