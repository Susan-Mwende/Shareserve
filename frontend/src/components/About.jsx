import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import aboutImage from "../assets/small baby.jpeg";
import "./About.css";
import MpesaPaymentModal from "./MpesaPaymentModal.jsx";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

function About() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [aboutData, setAboutData] = useState({
    mission: "Shareserve International is a mission driven organization working in rural kenya to address enronmental degradation and economic vulnerability through youth empowerment and sustainable solutions.",
    vision: "To raise and equip 100,000 + young environmental champions through education, tree growing and community driven environmental action.",
    history: "A greener, more environmental kenya led by younger resilient champions.",
    foundation: "We believe that earth was created with abundance and balance, entrusted to humanity's care, and that we share a responsibility to protect and restore it for present and future generations.",
    mandate: "Raising Environmental Champions who will provide transformative leadership in climate action, advocating for protection, conservation, restoration and regeneration of our Ecosystems.",
    values: [
      "Environmental Stewardship: We are committed to protecting and restoring our natural environment through sustainable practices and conservation efforts.",
      "Community Empowerment: We believe in empowering local communities with knowledge, resources, and opportunities for sustainable development.",
      "Climate Action: We actively work to mitigate climate change impacts and promote adaptation strategies for vulnerable communities.",
      "Integrity: We operate with transparency, accountability, and ethical standards in all our programs and partnerships.",
      "Innovation: We embrace innovative solutions and technologies to address environmental and development challenges."
    ],
    team: [
      {
        name: "Senior Director - Programs",
        role: "Leads program development and implementation",
        description: "Oversees all program activities and ensures alignment with organizational mission"
      },
      {
        name: "Programs Manager", 
        role: "Manages day-to-day program operations and team coordination",
        description: "Coordinates program activities and manages program staff"
      },
      {
        name: "Senior Director - Operations",
        role: "Oversees organizational operations and strategic planning",
        description: "Ensures efficient operations and strategic alignment with goals"
      },
      {
        name: "Operations Manager",
        role: "Manages operational logistics and field operations",
        description: "Coordinates field activities and operational logistics"
      }
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ABOUT);
      setAboutData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch about data:", error);
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" id="about">
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <div className="about-content">
            <h3 className="mb-4" style={{ color: "#198754" }}>About Us</h3>
            <p className="lead mb-4">
              Shareserve International is a mission driven organization working in rural kenya to address enronmental degradation and economic vulnerability
              through youth empowerment and sustainable solutions.
            </p>
            
            <h4 className="mb-3" style={{ color: "#F08000CC" }}>Our Foundation</h4>
            <p className="mb-4">
              {aboutData.foundation}
            </p>
            
            <h4 className="mb-3" style={{ color: "#F08000CC" }}>Our Mandate</h4>
            <p className="mb-4">
              {aboutData.mandate}
            </p>
            
            <h4 className="mb-3" style={{ color: "#F08000CC" }}>Vision Statement</h4>
            <p className="mb-4">
              {aboutData.vision}
            </p>
            
            <h4 className="mb-3" style={{ color: "#F08000CC" }}>Our Values</h4>
            <div className="values-grid">
              {aboutData.values.map((value, index) => (
                <div key={index} className="value-item">
                  <strong>{value.split(':')[0]}:</strong> {value.split(':')[1]}
                </div>
              ))}
            </div>
            
            <div className="mandate-header text-center mb-4">
              <h2 style={{ color: "#198754", fontWeight: "bold" }}>
                Meet Our Team
              </h2>
              <p className="lead text-muted">
                The dedicated individuals leading our environmental mission
              </p>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div className="about-image">
            <img 
              src={aboutImage} 
              alt="ShareServe community development and empowerment" 
              className="img-fluid rounded shadow"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
        </Col>
      </Row>

        <Row>
          {aboutData.team.map((member, index) => (
            <Col md={6} lg={4} className="mb-4" key={index}>
              <Card className="team-card h-100">
                <Card.Body>
                  <Card.Title as="h5" style={{ color: "#F08000CC" }}>
                    {member.name}
                  </Card.Title>
                  <Card.Text as="div">
                    <strong className="d-block mb-2" style={{ color: "#198754" }}>
                      {member.role}
                    </strong>
                    <p className="text-muted mb-0">
                      {member.description}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      <MpesaPaymentModal 
        show={showPaymentModal} 
        onHide={() => setShowPaymentModal(false)} 
      />
    </Container>
  );
}

export default About;
