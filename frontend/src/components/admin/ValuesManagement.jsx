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

const ValuesManagement = () => {
  const [values, setValues] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.VALUES);
      setValues(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch values");
      setLoading(false);
    }
  };

  const handleShowModal = (value = null) => {
    if (value) {
      setEditingId(value._id);
      setFormData({
        title: value.title,
        description: value.description,
        icon: value.icon || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        icon: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      icon: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        icon: formData.icon || "⭐",
      };

      if (editingId) {
        await axios.put(`${API_ENDPOINTS.VALUES}/${editingId}`, payload);
        setSuccess("Value updated successfully");
      } else {
        await axios.post(API_ENDPOINTS.VALUES, payload);
        setSuccess("Value added successfully");
      }

      fetchValues();
      handleCloseModal();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to save value");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this value?")) {
      try {
        await axios.delete(`${API_ENDPOINTS.VALUES}/${id}`);
        setSuccess("Value deleted successfully");
        fetchValues();
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete value");
      }
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading values...</div>;
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Values Management</h3>
        <Button variant="primary" onClick={() => handleShowModal()}>
          + Add Value
        </Button>
      </div>

      <Row>
        {values.map((value) => (
          <Col md={6} lg={4} key={value._id} className="mb-4">
            <Card>
              <Card.Body>
                <div className="text-center mb-3" style={{ fontSize: "2rem" }}>
                  {value.icon || "⭐"}
                </div>
                <Card.Title>{value.title}</Card.Title>
                <Card.Text>{value.description}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleShowModal(value)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(value._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {values.length === 0 && (
        <div className="text-center text-muted py-5">
          No values added yet. Click "+ Add Value" to create one.
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Value" : "Add Value"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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

export default ValuesManagement;
