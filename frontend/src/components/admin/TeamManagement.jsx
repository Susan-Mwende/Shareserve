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
} from "react-bootstrap";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api.js";

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.TEAM);
      setTeam(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch team members");
      setLoading(false);
    }
  };

  const handleShowModal = (member = null) => {
    if (member) {
      setEditingId(member._id);
      setFormData({
        name: member.name,
        position: member.position,
        bio: member.bio || "",
        image: member.image || "",
      });
    } else {
      setEditingId(null);
      setFormData({
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
    setEditingId(null);
    setFormData({
      name: "",
      position: "",
      bio: "",
      image: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        position: formData.position,
        bio: formData.bio,
        image: formData.image,
      };

      if (editingId) {
        await axios.put(`${API_ENDPOINTS.TEAM}/${editingId}`, payload);
        setSuccess("Team member updated successfully");
      } else {
        await axios.post(API_ENDPOINTS.TEAM, payload);
        setSuccess("Team member added successfully");
      }

      fetchTeam();
      handleCloseModal();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to save team member");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await axios.delete(`${API_ENDPOINTS.TEAM}/${id}`);
        setSuccess("Team member deleted successfully");
        fetchTeam();
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete team member");
      }
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading team members...</div>;
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Team Management</h3>
        <Button variant="primary" onClick={() => handleShowModal()}>
          + Add Team Member
        </Button>
      </div>

      <Row>
        {team.map((member) => (
          <Col md={6} lg={4} key={member._id} className="mb-4">
            <Card>
              {member.image && (
                <Card.Img
                  variant="top"
                  src={member.image}
                  alt={member.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {member.position}
                </Card.Subtitle>
                <Card.Text>{member.bio}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleShowModal(member)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {team.length === 0 && (
        <div className="text-center text-muted py-5">
          No team members added yet. Click "+ Add Team Member" to create one.
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Edit Team Member" : "Add Team Member"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editingId ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeamManagement;
