import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Tabs,
  Tab,
} from "react-bootstrap";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api.js";

const ContactManagement = () => {
  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    socialMedia: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    },
    workingHours: {
      weekdays: "",
      weekends: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.CONTACT);
      setContactData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch contact data");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(API_ENDPOINTS.CONTACT, contactData);
      setSuccess("Contact information updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update contact information");
    }
  };

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setContactData({
        ...contactData,
        [nested]: {
          ...contactData[nested],
          [field]: value,
        },
      });
    } else {
      setContactData({
        ...contactData,
        [field]: value,
      });
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading contact data...</div>;
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2>Contact Management</h2>
          <p className="text-muted">Manage your organization's contact information</p>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Tabs defaultActiveKey="basic" className="mb-4">
        <Tab eventKey="basic" title="Basic Information">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone *</Form.Label>
                      <Form.Control
                        type="tel"
                        required
                        value={contactData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={contactData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={contactData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Country *</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={contactData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code *</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={contactData.postalCode}
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button variant="primary" onClick={handleSave}>
                  Save Contact Information
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="social" title="Social Media">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://facebook.com/yourpage"
                        value={contactData.socialMedia.facebook}
                        onChange={(e) =>
                          handleInputChange("facebook", e.target.value, "socialMedia")
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Twitter</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://twitter.com/yourhandle"
                        value={contactData.socialMedia.twitter}
                        onChange={(e) =>
                          handleInputChange("twitter", e.target.value, "socialMedia")
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Instagram</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://instagram.com/yourhandle"
                        value={contactData.socialMedia.instagram}
                        onChange={(e) =>
                          handleInputChange("instagram", e.target.value, "socialMedia")
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>LinkedIn</Form.Label>
                      <Form.Control
                        type="url"
                        placeholder="https://linkedin.com/company/yourcompany"
                        value={contactData.socialMedia.linkedin}
                        onChange={(e) =>
                          handleInputChange("linkedin", e.target.value, "socialMedia")
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>YouTube</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://youtube.com/channel/yourchannel"
                    value={contactData.socialMedia.youtube}
                    onChange={(e) =>
                      handleInputChange("youtube", e.target.value, "socialMedia")
                    }
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSave}>
                  Save Social Media Links
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="hours" title="Working Hours">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Weekdays Hours</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                    value={contactData.workingHours.weekdays}
                    onChange={(e) =>
                      handleInputChange("weekdays", e.target.value, "workingHours")
                    }
                  />
                  <Form.Text className="text-muted">
                    Specify working hours for Monday to Friday
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Weekend Hours</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Closed or 10:00 AM - 2:00 PM"
                    value={contactData.workingHours.weekends}
                    onChange={(e) =>
                      handleInputChange("weekends", e.target.value, "workingHours")
                    }
                  />
                  <Form.Text className="text-muted">
                    Specify working hours for Saturday and Sunday
                  </Form.Text>
                </Form.Group>

                <Button variant="primary" onClick={handleSave}>
                  Save Working Hours
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ContactManagement;
