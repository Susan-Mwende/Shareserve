import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";
const babyImage = "/baby.jpeg";

function Vision() {
  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: "80px", minHeight: "100vh" }}>

        {/* Split layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "calc(100vh - 80px)" }}>

          {/* Left - Content */}
          <div style={{ background: "linear-gradient(135deg, #000 0%, #0a1f0a 100%)", display: "flex", alignItems: "center", padding: "4rem" }}>
            <div>
              <span style={{ display: "inline-block", background: "rgba(25,135,84,0.2)", border: "1px solid rgba(25,135,84,0.4)", color: "#4ade80", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "50px", marginBottom: "1.5rem" }}>
                Our Vision
              </span>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔭</div>
              <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Vision <span style={{ color: "#198754" }}>Statement</span>
              </h1>
              <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.9, marginBottom: "2rem" }}>
                A world where empowered communities live in harmony with nature, leading climate action
                that sustains livelihoods, protects ecosystems, and inspires future generations to thrive.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link to="/our-mandate" style={{ background: "#198754", color: "#fff", padding: "0.65rem 1.5rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9rem" }}>
                  Our Mandate →
                </Link>
                <Link to="/about" style={{ background: "transparent", color: "#fff", padding: "0.65rem 1.5rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", border: "2px solid rgba(255,255,255,0.35)", fontSize: "0.9rem" }}>
                  ← Who We Are
                </Link>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src={babyImage} alt="Vision for the Future" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.3), transparent)" }} />
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default Vision;