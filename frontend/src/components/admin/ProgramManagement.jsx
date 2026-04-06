import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Table,
  Badge,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api.js";

const ProgramManagement = () => {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    category: "Health",
    status: "planning",
    startDate: "",
    endDate: "",
    budget: { target: 0, raised: 0 },
    location: "",
    beneficiaries: 0,
    impact: [],
    gallery: [],
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      console.log("Fetching programs..."); // Debug log
      const response = await axios.get(API_ENDPOINTS.PROGRAMS);
      console.log("Programs fetched:", response.data); // Debug log
      setPrograms(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err); // Debug log
      setError("Failed to fetch programs");
      setLoading(false);
    }
  };

  const handleShowModal = (program = null) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        title: program.title,
        description: program.description,
        image: program.image,
        category: program.category,
        status: program.status,
        startDate: program.startDate?.split("T")[0] || "",
        endDate: program.endDate?.split("T")[0] || "",
        budget: program.budget || { target: 0, raised: 0 },
        location: program.location,
        beneficiaries: program.beneficiaries || 0,
        impact: program.impact || [],
        gallery: program.gallery || [],
      });
    } else {
      setEditingProgram(null);
      setFormData({
        title: "",
        description: "",
        image: "",
        category: "Health",
        status: "planning",
        startDate: "",
        endDate: "",
        budget: { target: 0, raised: 0 },
        location: "",
        beneficiaries: 0,
        impact: [],
        gallery: [],
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProgram(null);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting program data:", formData); // Debug log
      
      let response;
      if (editingProgram) {
        response = await axios.put(
          `${API_ENDPOINTS.PROGRAMS}/${editingProgram._id}`,
          formData
        );
        setSuccess("Program updated successfully");
      } else {
        response = await axios.post(API_ENDPOINTS.PROGRAMS, formData);
        console.log("Program created response:", response.data); // Debug log
        setSuccess("Program created successfully");
      }
      
      // Wait a moment then refresh
      setTimeout(() => {
        fetchPrograms();
      }, 500);
      
      handleCloseModal();
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message); // Debug log
      setError(editingProgram ? "Failed to update program" : "Failed to create program");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      try {
        await axios.delete(`${API_ENDPOINTS.PROGRAMS}/${id}`);
        setSuccess("Program deleted successfully");
        fetchPrograms();
      } catch (err) {
        setError("Failed to delete program");
      }
    }
  };

  const getStatusBadge = (status) => {
    const variant = {
      active: "success",
      completed: "primary",
      planning: "warning",
    }[status];
    return <Badge bg={variant}>{status}</Badge>;
  };

  if (loading) {
    return <div className="text-center p-4">Loading programs...</div>;
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2>Program Management</h2>
          <p className="text-muted">Manage your NGO programs and activities</p>
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            onClick={() => handleShowModal()}
            className="mt-3"
          >
            + Add New Program
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Location</th>
                <th>Beneficiaries</th>
                <th>Budget</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program._id}>
                  <td>
                    <div>
                      <strong>{program.title}</strong>
                      <br />
                      <small className="text-muted">
                        {program.description.substring(0, 50)}...
                      </small>
                    </div>
                  </td>
                  <td>{program.category}</td>
                  <td>{getStatusBadge(program.status)}</td>
                  <td>{program.location}</td>
                  <td>{program.beneficiaries}</td>
                  <td>
                    ${program.budget?.raised || 0} / ${program.budget?.target || 0}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => handleShowModal(program)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(program._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProgram ? "Edit Program" : "Add New Program"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Program Title *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Livelihood">Livelihood</option>
                    <option value="Environment">Environment</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>

            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Budget Target</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.budget.target}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        budget: { ...formData.budget, target: Number(e.target.value) },
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount Raised</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.budget.raised}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        budget: { ...formData.budget, raised: Number(e.target.value) },
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Beneficiaries</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.beneficiaries}
                    onChange={(e) =>
                      setFormData({ ...formData, beneficiaries: Number(e.target.value) })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingProgram ? "Update Program" : "Create Program"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ProgramManagement;
