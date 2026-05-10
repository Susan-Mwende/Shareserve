import { Container, Row, Col, Card } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent.jsx";
import Footer from "../components/Footer.jsx";
import aboutImage from "../assets/livelihood.jpg";

function WhoWeAre({ showFooter = true }) {
  const divStyle = showFooter 
    ? { paddingTop: "100px", backgroundColor: "#f8f9fa", minHeight: "100vh" } 
    : {};
  
  const content = (
    <div style={divStyle}>
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="mb-4">
              <h1 className="mb-4" style={{ color: "#198754", fontWeight: "bold" }}>
                About Us
              </h1>
              <p className="lead mb-4">
                Shareserve International is a mission-driven organization working in rural Kenya 
                to address environmental degradation and economic vulnerability through youth 
                empowerment and sustainable solutions.
              </p>
            </Col>
            <Col lg={6} className="mb-4">
              <img 
                src={aboutImage} 
                alt="About Shareserve International" 
                className="img-fluid rounded shadow"
                style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
      </div>
  );

  if (showFooter) {
    return (
      <>
        <NavbarComponent />
        {content}
        <Footer />
      </>
    );
  }

  return content;
}

export default WhoWeAre;
