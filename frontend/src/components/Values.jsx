import { Container, Row, Col, Card } from "react-bootstrap";
import { FaLeaf, FaUsers, FaSun, FaHandshake, FaLightbulb } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import "./Values.css";

function Values() {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ABOUT);
      const aboutData = response.data;
      if (aboutData.values && aboutData.values.length > 0) {
        setValues(aboutData.values);
      } else {
        // Fallback to default values if none in backend
        setValues([
          {
            icon: <FaLeaf />,
            title: "Environmental Stewardship",
            description: "We are committed to protecting and restoring our natural environment through sustainable practices and conservation efforts."
          },
          {
            icon: <FaUsers />, 
            title: "Community Empowerment",
            description: "We believe in empowering local communities with knowledge, resources, and opportunities for sustainable development."
          },
          {
            icon: <FaSun />,
            title: "Climate Action",
            description: "We actively work to mitigate climate change impacts and promote adaptation strategies for vulnerable communities."
          },
          {
            icon: <FaHandshake />,
            title: "Integrity",
            description: "We operate with transparency, accountability, and ethical standards in all our programs and partnerships."
          },
          {
            icon: <FaLightbulb />,
            title: "Innovation",
            description: "We embrace innovative solutions and technologies to address environmental and development challenges."
          }
        ]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch values:", error);
      // Set fallback values on error
      setValues([
        {
          icon: <FaLeaf />,
          title: "Environmental Stewardship",
          description: "We are committed to protecting and restoring our natural environment through sustainable practices and conservation efforts."
        },
        {
          icon: <FaUsers />, 
          title: "Community Empowerment",
          description: "We believe in empowering local communities with knowledge, resources, and opportunities for sustainable development."
        },
        {
          icon: <FaSun />,
          title: "Climate Action",
          description: "We actively work to mitigate climate change impacts and promote adaptation strategies for vulnerable communities."
        },
        {
          icon: <FaHandshake />,
          title: "Integrity",
          description: "We operate with transparency, accountability, and ethical standards in all our programs and partnerships."
        },
        {
          icon: <FaLightbulb />,
          title: "Innovation",
          description: "We embrace innovative solutions and technologies to address environmental and development challenges."
        }
      ]);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading values...</div>;
  }

  return (
    <div className="values-section">
      <Container>
        <h2 className="section-title text-center">Values</h2>
        <p className="section-subtitle">
          The core principles that guide our mission and daily operations
        </p>
        
        <Row className="g-4 justify-content-center">
          {values.map((value, index) => (
            <Col xs={12} sm={6} md={4} lg={2} xl={2} className="d-flex justify-content-center" key={index}>
              <Card className="h-80 value-card">
                <Card.Body className="text-center">
                  <div className="value-icon">
                    {value.icon}
                  </div>
                  <Card.Title as="h5">{value.title}</Card.Title>
                  <Card.Text>{value.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Values;