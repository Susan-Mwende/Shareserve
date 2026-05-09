import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import "./ImpactStories.css";

function ImpactStories() {
  const [impactData, setImpactData] = useState({
    greenClubsEstablished: 0,
    greenChampions: 0,
    communityAmbassadors: 0,
    totalTreesPlanted: 0,
    fruitTrees: 0,
    indigenousTrees: 0,
    schoolsUnderProgram: 0,
    orchardsEstablished: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImpactData();
  }, []);

  const fetchImpactData = async () => {
    try {
      // For now, use sample data - this can be connected to backend
      const sampleData = {
        greenClubsEstablished: 25,
        greenChampions: 500,
        communityAmbassadors: 150,
        totalTreesPlanted: 50000,
        fruitTrees: 15000,
        indigenousTrees: 35000,
        schoolsUnderProgram: 45,
        orchardsEstablished: 12
      };
      setImpactData(sampleData);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch impact data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h2>Loading Impact Data...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5" id="impact-stories">
      <Row className="mb-5">
        <Col md={12}>
          <div className="impact-header text-center mb-5">
            <h1 className="display-4" style={{ color: "#198754", fontWeight: "bold" }}>
              Our Impact
            </h1>
            <p className="lead text-muted">
              Measuring our environmental and community impact across Kenya
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card className="impact-overview-card">
            <Card.Body>
              <Card.Title as="h3" style={{ color: "#F08000CC" }}>
                Environmental Impact Summary
              </Card.Title>
              <Row>
                <Col md={6} className="mb-3">
                  <div className="impact-metric">
                    <h4 style={{ color: "#198754" }}>
                      {impactData.greenClubsEstablished.toLocaleString()}
                    </h4>
                    <p className="text-muted">Green Clubs Established</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="impact-metric">
                    <h4 style={{ color: "#198754" }}>
                      {impactData.greenChampions.toLocaleString()}
                    </h4>
                    <p className="text-muted">Green Champions Under Program</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="impact-metric">
                    <h4 style={{ color: "#198754" }}>
                      {impactData.communityAmbassadors.toLocaleString()}
                    </h4>
                    <p className="text-muted">Community Ambassadors Under Program</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="impact-metric">
                    <h4 style={{ color: "#198754" }}>
                      {impactData.schoolsUnderProgram.toLocaleString()}
                    </h4>
                    <p className="text-muted">Schools Under Program</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card className="trees-impact-card">
            <Card.Body>
              <Card.Title as="h3" style={{ color: "#F08000CC" }}>
                Tree Planting Impact
              </Card.Title>
              <Row>
                <Col md={4} className="mb-3">
                  <div className="impact-metric">
                    <h4 style={{ color: "#198754" }}>
                      {impactData.totalTreesPlanted.toLocaleString()}
                    </h4>
                    <p className="text-muted">Total Trees Planted</p>
                    <ProgressBar 
                      now={100} 
                      variant="success" 
                      style={{ height: "8px" }}
                    />
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="impact-metric">
                    <h4 style={{ color: "#F08000CC" }}>
                      {impactData.fruitTrees.toLocaleString()}
                    </h4>
                    <p className="text-muted">Fruit Trees</p>
                    <ProgressBar 
                      now={(impactData.fruitTrees / impactData.totalTreesPlanted) * 100} 
                      variant="warning" 
                      style={{ height: "8px" }}
                    />
                    <small className="text-muted">
                      {Math.round((impactData.fruitTrees / impactData.totalTreesPlanted) * 100)}% of total
                    </small>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="impact-metric">
                    <h4 style={{ color: "#F08000CC" }}>
                      {impactData.indigenousTrees.toLocaleString()}
                    </h4>
                    <p className="text-muted">Indigenous Trees</p>
                    <ProgressBar 
                      now={(impactData.indigenousTrees / impactData.totalTreesPlanted) * 100} 
                      variant="info" 
                      style={{ height: "8px" }}
                    />
                    <small className="text-muted">
                      {Math.round((impactData.indigenousTrees / impactData.totalTreesPlanted) * 100)}% of total
                    </small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card className="orchards-impact-card">
            <Card.Body>
              <Card.Title as="h3" style={{ color: "#F08000CC" }}>
                Orchards and Schools Impact
              </Card.Title>
              <Row>
                <Col md={6} className="mb-3">
                  <div className="impact-metric">
                    <h4 style={{ color: "#198754" }}>
                      {impactData.orchardsEstablished.toLocaleString()}
                    </h4>
                    <p className="text-muted">Orchards Established</p>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="impact-metric">
                    <h4 style={{ color: "#198754" }}>
                      {impactData.schoolsUnderProgram.toLocaleString()}
                    </h4>
                    <p className="text-muted">Number of Schools Under Program</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card className="impact-story-card">
            <Card.Body>
              <Card.Title as="h3" style={{ color: "#F08000CC" }}>
                Our Impact Story
              </Card.Title>
              <Card.Text>
                <p>
                  Through our comprehensive environmental programs, ShareServe International has made significant strides in creating a greener, more sustainable Kenya. 
                  Our Green Champions program has empowered over {impactData.greenChampions.toLocaleString()} young environmental leaders 
                  who are actively driving climate action in their communities.
                </p>
                <p>
                  The establishment of {impactData.greenClubsEstablished.toLocaleString()} Green Clubs across Kenya has created 
                  sustainable platforms for environmental education and action, while our {impactData.communityAmbassadors.toLocaleString()} 
                  Community Ambassadors continue to lead conservation efforts at the grassroots level.
                </p>
                <p>
                  Our tree planting initiatives have resulted in over {impactData.totalTreesPlanted.toLocaleString()} trees being planted, 
                  including {impactData.fruitTrees.toLocaleString()} fruit trees that provide sustainable food sources and 
                  {impactData.indigenousTrees.toLocaleString()} indigenous trees that support local biodiversity.
                </p>
                <p>
                  With {impactData.orchardsEstablished.toLocaleString()} orchards established and {impactData.schoolsUnderProgram.toLocaleString()} 
                  schools actively participating in our programs, we're building a foundation for long-term environmental stewardship 
                  and community resilience.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ImpactStories;
