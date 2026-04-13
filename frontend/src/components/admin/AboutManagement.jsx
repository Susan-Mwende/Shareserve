import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Alert,
  Tabs,
  Tab,
} from "react-bootstrap";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api.js";

const AboutManagement = () => {
  const [aboutData, setAboutData] = useState({
    mission: "",
    vision: "",
    history: "",
    values: [],
    team: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "value" or "team"
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    name: "",
    position: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ABOUT);
      setAboutData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch about data");
      setLoading(false);
    }
  };

  const handleSaveMainInfo = async () => {
    try {
      await axios.put(API_ENDPOINTS.ABOUT, aboutData);
      setSuccess("About information updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update about information");
    }
  };

  const handleShowModal = (type, index = null) => {
    setModalType(type);
    setEditingIndex(index);
    
    if (type === "value" && index !== null) {
      const value = aboutData.values[index];
      setFormData({
        title: value.title,
        description: value.description,
        icon: value.icon || "",
        name: "",
        position: "",
        bio: "",
        image: "",
      });
    } else if (type === "team" && index !== null) {
      const member = aboutData.team[index];
      setFormData({
        title: "",
        description: "",
        name: member.name,
        position: member.position,
        bio: member.bio,
        image: member.image,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        name: "",
        position: "",
        bio: "",
        image: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
    setEditingIndex(null);
    setFormData({
      title: "",
      description: "",
      icon: "",
      name: "",
      position: "",
      bio: "",
      image: "",
    });
  };

  const handleModalSubmit = () => {
    if (modalType === "value") {
      const newValue = {
        title: formData.title,
        description: formData.description,
        icon: formData.icon || "⭐",
      };

      if (editingIndex !== null) {
        const updatedValues = [...aboutData.values];
        updatedValues[editingIndex] = newValue;
        setAboutData({ ...aboutData, values: updatedValues });
      } else {
        setAboutData({
          ...aboutData,
          values: [...aboutData.values, newValue],
        });
      }
    } else if (modalType === "team") {
      const newMember = {
        name: formData.name,
        position: formData.position,
        bio: formData.bio,
        image: formData.image,
      };

      if (editingIndex !== null) {
        const updatedTeam = [...aboutData.team];
        updatedTeam[editingIndex] = newMember;
        setAboutData({ ...aboutData, team: updatedTeam });
      } else {
        setAboutData({
          ...aboutData,
          team: [...aboutData.team, newMember],
        });
      }
    }

    handleCloseModal();
    setSuccess(
      modalType === "value"
        ? editingIndex !== null
          ? "Value updated successfully"
          : "Value added successfully"
        : editingIndex !== null
        ? "Team member updated successfully"
        : "Team member added successfully"
    );
    setTimeout(() => setSuccess(""), 3000);
  };

  const handleDelete = (type, index) => {
    if (window.confirm(`Are you sure you want to delete this ${type === "value" ? "value" : "team member"}?`)) {
      if (type === "value") {
        const updatedValues = aboutData.values.filter((_, i) => i !== index);
        setAboutData({ ...aboutData, values: updatedValues });
      } else {
        const updatedTeam = aboutData.team.filter((_, i) => i !== index);
        setAboutData({ ...aboutData, team: updatedTeam });
      }
      setSuccess(`${type === "value" ? "Value" : "Team member"} deleted successfully`);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading about data...</div>;
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2>About Management</h2>
          <p className="text-muted">Manage your organization's information</p>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Tabs defaultActiveKey="main" className="mb-4">
        <Tab eventKey="main" title="Main Information">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Mission</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={aboutData.mission}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, mission: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Vision</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={aboutData.vision}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, vision: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>History</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={aboutData.history}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, history: e.target.value })
                    }
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSaveMainInfo}>
                  Save Main Information
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="values" title="Values">
          <Card className="border-0 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Core Values</h5>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleShowModal("value")}
              >
                + Add Value
              </Button>
            </Card.Header>
            <Card.Body>
              {aboutData.values.length === 0 ? (
                <p className="text-muted">No values added yet.</p>
              ) : (
                <Row>
                  {aboutData.values.map((value, index) => (
                    <Col md={6} key={index} className="mb-3">
                      <Card>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6>{value.title}</h6>
                              <p className="text-muted mb-0">{value.description}</p>
                            </div>
                            <div>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                className="me-2"
                                onClick={() => handleShowModal("value", index)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleDelete("value", index)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="team" title="Team">
          <Card className="border-0 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Team Members</h5>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleShowModal("team")}
              >
                + Add Team Member
              </Button>
            </Card.Header>
            <Card.Body>
              {aboutData.team.length === 0 ? (
                <p className="text-muted">No team members added yet.</p>
              ) : (
                <Row>
                  {aboutData.team.map((member, index) => (
                    <Col md={6} key={index} className="mb-3">
                      <Card>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="d-flex">
                              {member.image && (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  style={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    marginRight: "15px",
                                  }}
                                />
                              )}
                              <div>
                                <h6>{member.name}</h6>
                                <p className="text-muted mb-1">{member.position}</p>
                                <small className="text-muted">{member.bio}</small>
                              </div>
                            </div>
                            <div>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                className="me-2"
                                onClick={() => handleShowModal("team", index)}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleDelete("team", index)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "value"
              ? editingIndex !== null
                ? "Edit Value"
                : "Add Value"
              : editingIndex !== null
              ? "Edit Team Member"
              : "Add Team Member"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "value" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Icon (emoji)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. 🌱, 💚, 🤝, ⭐"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            {editingIndex !== null ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AboutManagement;
