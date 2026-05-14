import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";
import "./MeetOurTeam.css";

const team = [
  {
    department: "Programs",
    color: "#198754",
    icon: "🌿",
    members: [
      { role: "Senior Director – Programs", icon: "👩‍💼", description: "Leads program development and implementation, ensuring alignment with the organisational mission." },
      { role: "Programs Manager", icon: "👨‍💼", description: "Coordinates day-to-day program activities and manages the programs team." },
    ],
  },
  {
    department: "Operations",
    color: "#0d6efd",
    icon: "⚙️",
    members: [
      { role: "Senior Director – Operations", icon: "👩‍💼", description: "Oversees organisational operations and strategic planning to ensure efficient delivery." },
      { role: "Operations Manager", icon: "👨‍💼", description: "Coordinates field activities and operational logistics across all programs." },
    ],
  },
];

function MeetOurTeam() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "80px", minHeight: "100vh", backgroundColor: "#f9fafb" }}>

        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #000 0%, #0a1f0a 60%, #0f3020 100%)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "350px", height: "350px", borderRadius: "50%", border: "2px solid rgba(25,135,84,0.2)" }} />
          <Container style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <span style={{ display: "inline-block", background: "rgba(25,135,84,0.15)", border: "1px solid rgba(25,135,84,0.4)", color: "#4ade80", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "6px 16px", borderRadius: "50px", marginBottom: "1.5rem" }}>
              About Us
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem" }}>
              Meet Our <span style={{ color: "#198754" }}>Team</span>
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
              Dedicated professionals driving our environmental mission forward
            </p>
          </Container>
        </div>

        <Container className="py-5">
          <Row className="g-4 justify-content-center">
            {team.map((dept, i) => (
              <Col key={i} md={10} lg={8}>
                <div style={{ border: `2px solid ${dept.color}`, borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
                  {/* Dept header */}
                  <div style={{ background: dept.color, padding: "1.25rem 2rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{dept.icon}</span>
                    <h4 style={{ color: "#fff", fontWeight: 700, margin: 0 }}>{dept.department} Department</h4>
                  </div>

                  {/* Members */}
                  {dept.members.map((m, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", padding: "1.5rem 2rem", borderBottom: j < dept.members.length - 1 ? "1px solid #e5e7eb" : "none", background: "#fff" }}>
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: `${dept.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", flexShrink: 0 }}>
                        {m.icon}
                      </div>
                      <div>
                        <h5 style={{ color: "#111827", fontWeight: 700, marginBottom: "0.3rem" }}>{m.role}</h5>
                        <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{m.description}</p>
                      </div>
                    </div>
                  ))}
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

export default MeetOurTeam;