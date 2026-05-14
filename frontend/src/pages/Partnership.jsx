import { Container, Row, Col, Card, Button, Alert, Tab, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import "./Partnership.css";
import "./PartnershipHero.css";
import heroImage from "../assets/hero.jpg";

function Partnership() {
  const [partnershipData, setPartnershipData] = useState({
    sponsorship: [
      {
        type: "Sponsor a Champion/Ambassador",
        amount: "$50 per year",
        description: "Support individual environmental champions and ambassadors in their work",
        benefits: [
          "Direct impact on environmental champion's work",
          "Regular updates on sponsored individual's activities",
          "Recognition on our website and annual report",
          "Tax-deductible contribution"
        ]
      },
      {
        type: "Sponsor a Green Club/School",
        amount: "$750 per year",
        description: "Support environmental education and activities in schools",
        benefits: [
          "Support environmental education for 50+ students",
          "Help establish green clubs in schools",
          "Provide environmental resources and materials",
          "Annual impact report and recognition",
          "Tax-deductible contribution"
        ]
      },
      {
        type: "Sponsor a Community Ambassador",
        amount: "$50 per year",
        description: "Support community environmental ambassadors",
        benefits: [
          "Support grassroots environmental leadership",
          "Help community conservation efforts",
          "Regular updates on ambassador's work",
          "Recognition in annual report",
          "Tax-deductible contribution"
        ]
      }
    ],
    partners: [
      {
        category: "NGO Partner",
        description: "Collaborate with other non-profit organizations",
        benefits: [
          "Shared resources and expertise",
          "Joint program implementation",
          "Increased funding opportunities",
          "Broader community impact"
        ]
      },
      {
        category: "School Partner",
        description: "Partner with educational institutions",
        benefits: [
          "Environmental curriculum integration",
          "Student environmental education",
          "Green club establishment",
          "Community outreach programs"
        ]
      },
      {
        category: "Corporate Partner",
        description: "Corporate social responsibility partnerships",
        benefits: [
          "Employee engagement programs",
          "Brand visibility and recognition",
          "Environmental impact reporting",
          "CSR goal achievement"
        ]
      },
      {
        category: "Individual Partner",
        description: "Individual supporters and volunteers",
        benefits: [
          "Direct community impact",
          "Personal fulfillment",
          "Skills development",
          "Network building"
        ]
      }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sponsorship');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    partnershipType: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchPartnershipData();
  }, []);

  const fetchPartnershipData = async () => {
    try {
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch partnership data:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Partnership inquiry submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          organization: '',
          partnershipType: '',
          message: ''
        });
      }, 5000);
    } catch (error) {
      console.error('Error submitting partnership inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h2>Loading Partnership Information...</h2>
        </div>
      </Container>
    );
  }

  return (
    <>
      <div className="partnership-hero">
        <img
          src={heroImage}
          alt="Partnership"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, rgba(25, 135, 84, 0.7) 0%, rgba(45, 106, 79, 0.7) 100%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container>
            <Row className="align-items-center">
              <Col lg={12} className="text-center text-white">
                <h1 className="display-4 fw-bold mb-4">
                  Partner With Us
                </h1>
                <p className="lead mb-0">
                  Join us in creating environmental impact across Kenya
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Container className="mt-5" id="partnership">
        <Row className="mb-5">
          <Col md={12}>
            <div className="partnership-header text-center mb-5">
              <h2 className="display-5" style={{ color: "#198754", fontWeight: "bold" }}>
                Partnership Opportunities
              </h2>
            </div>
          </Col>
        </Row>

        <Tab.Container id="partnership-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Row className="mb-4">
            <Col md={12}>
              <Nav variant="pills" className="justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="sponsorship" active={activeTab === 'sponsorship'}>
                    Sponsorship
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="partners" active={activeTab === 'partners'}>
                    Partnership Types
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>

          <Tab.Content>
            <Tab.Pane eventKey="sponsorship">
              <Row className="mb-5">
                <Col md={12}>
                  <div className="sponsorship-header text-center mb-4">
                    <h2 style={{ color: "#F08000CC", fontWeight: "bold" }}>
                      Sponsorship Opportunities
                    </h2>
                    <p className="lead">
                      Support our environmental programs through targeted sponsorship
                    </p>
                  </div>
                </Col>
              </Row>

              <Row>
                {partnershipData.sponsorship.map((option, index) => (
                  <Col md={6} lg={4} className="mb-4" key={index}>
                    <Card className="sponsorship-card h-100">
                      <Card.Body>
                        <Card.Title as="h5" style={{ color: "#198754" }}>
                          {option.type}
                        </Card.Title>
                        <Card.Text as="div">
                          <div className="sponsorship-amount">
                            <h4 style={{ color: "#F08000CC" }}>
                              {option.amount}
                            </h4>
                          </div>
                          <p className="text-muted mb-3">
                            {option.description}
                          </p>
                          <h6 className="mb-3">Benefits:</h6>
                          <ul>
                            {option.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex}>{benefit}</li>
                            ))}
                          </ul>
                        </Card.Text>
                        <Button
                          variant="success"
                          className="sponsorship-btn"
                          onClick={() => setFormData(prev => ({ ...prev, partnershipType: option.type }))}
                        >
                          Choose This Sponsorship
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab.Pane>

            <Tab.Pane eventKey="partners">
              <Row className="mb-5">
                <Col md={12}>
                  <div className="partners-header text-center mb-4">
                    <h2 style={{ color: "#F08000CC", fontWeight: "bold" }}>
                      Partnership Types
                    </h2>
                    <p className="lead">
                      Different ways to collaborate with ShareServe
                    </p>
                  </div>
                </Col>
              </Row>

              <Row>
                {partnershipData.partners.map((partner, index) => (
                  <Col md={6} lg={4} className="mb-4" key={index}>
                    <Card className="partner-card h-100">
                      <Card.Body>
                        <Card.Title as="h5" style={{ color: "#198754" }}>
                          {partner.category}
                        </Card.Title>
                        <Card.Text as="div">
                          <p className="text-muted mb-3">
                            {partner.description}
                          </p>
                          <h6 className="mb-3">Benefits:</h6>
                          <ul>
                            {partner.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex}>{benefit}</li>
                            ))}
                          </ul>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        <Row className="mb-5">
          <Col md={12}>
            <Card className="inquiry-form-card">
              <Card.Body>
                <Card.Title as="h3" style={{ color: "#F08000CC" }}>
                  Partnership Inquiry
                </Card.Title>

                {submitted && (
                  <Alert variant="success" className="mb-4">
                    Thank you for your partnership interest! We'll review your inquiry and get back to you soon.
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <label htmlFor="organization" className="form-label">Organization</label>
                      <input
                        type="text"
                        className="form-control"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Enter your organization name"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <label htmlFor="partnershipType" className="form-label">Partnership Type</label>
                      <select
                        className="form-control"
                        id="partnershipType"
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select partnership type</option>
                        <option value="sponsorship">Sponsorship</option>
                        <option value="ngo">NGO Partner</option>
                        <option value="school">School Partner</option>
                        <option value="corporate">Corporate Partner</option>
                        <option value="individual">Individual Partner</option>
                      </select>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12} className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your partnership interest..."
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <Button
                        type="submit"
                        variant="success"
                        size="lg"
                        disabled={loading}
                        className="submit-btn"
                      >
                        {loading ? 'Submitting...' : 'Submit Partnership Inquiry'}
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Partnership;