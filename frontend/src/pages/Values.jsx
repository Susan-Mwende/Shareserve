import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./Values.css";
import NavbarComponent from "@/components/NavbarComponent.jsx";
import Footer from "@/components/Footer.jsx";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";

function Values() {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchValuesData();
  }, []);

  const fetchValuesData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.VALUES);
      if (response.data && response.data.length > 0) {
        setValues(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch values data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div style={{ paddingTop: '80px' }}>
      <Container className="pt-5 pb-5" id="values">
      <Row className="justify-content-center mb-4">
        <Col md={10} lg={8}>
          <h1 className="text-center mb-4" style={{ color: "#198754" }}>
            Our Values
          </h1>
          <p className="lead text-center">
            These core principles guide everything we do at ShareServe International
          </p>
        </Col>
      </Row>
      {loading ? (
        <Row className="justify-content-center">
          <Col className="text-center">
            <p>Loading values...</p>
          </Col>
        </Row>
      ) : values.length === 0 ? (
        <Row className="justify-content-center">
          <Col className="text-center">
            <p className="text-muted">No values added yet. Please check back later.</p>
          </Col>
        </Row>
      ) : (
        <Row className="g-4">
          {values.map((value, index) => (
            <Col md={6} lg={4} key={index}>
              <Card className="value-card text-center h-100 shadow">
                <Card.Body className="p-4">
                  <div className="value-icon mb-3" style={{ fontSize: '2.5rem' }}>
                    {value.icon}
                  </div>
                  <h4 className="mb-3" style={{ color: "#198754" }}>
                    {value.title}
                  </h4>
                  <p className="text-muted">
                    {value.description}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      </Container>
      </div>
      <Footer />
    </>
  );
}

export default Values;
