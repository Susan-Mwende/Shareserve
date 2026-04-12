import { Container, Row, Col, Card } from "react-bootstrap";
import "./MeetOurTeam.css";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

function MeetOurTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ABOUT);
      if (response.data && response.data.team && response.data.team.length > 0) {
        setTeamMembers(response.data.team);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch team data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="team-page" style={{ marginTop: '80px' }}>
        <Container className="py-5">
          <Row className="justify-content-center mb-5">
            <Col md={10} lg={8} className="text-center">
              <h1 className="team-title" style={{ color: "#198754" }}>
                Meet Our Team
              </h1>
              <p className="team-subtitle lead">
                Dedicated professionals working together for a greener future
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {teamMembers.map((member, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="team-card text-center h-100 shadow">
                  <div className="team-image-wrapper">
                    <Card.Img 
                      variant="top" 
                      src={member.image} 
                      alt={member.name}
                      className="team-image"
                    />
                  </div>
                  <Card.Body className="p-4">
                    <h4 className="team-name" style={{ color: "#198754" }}>
                      {member.name}
                    </h4>
                    <p className="team-role text-muted fw-bold">
                      {member.position}
                    </p>
                    <p className="team-description text-muted">
                      {member.bio}
                    </p>
                  </Card.Body>
                </Card>
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
