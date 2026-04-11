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

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    imageUrl: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GALLERY);
      setGalleryItems(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch gallery items");
      setLoading(false);
    }
  };

  const handleShowModal = (index = null) => {
    setEditingIndex(index);
    if (index !== null) {
      const item = galleryItems[index];
      setFormData({
        title: item.title,
        caption: item.caption,
        imageUrl: item.imageUrl,
        order: item.order,
        isActive: item.isActive,
      });
    } else {
      setFormData({
        title: "",
        caption: "",
        imageUrl: "",
        order: galleryItems.length,
        isActive: true,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setFormData({
      title: "",
      caption: "",
      imageUrl: "",
      order: 0,
      isActive: true,
    });
  };

  const handleModalSubmit = async () => {
    try {
      const newItem = {
        title: formData.title,
        caption: formData.caption,
        imageUrl: formData.imageUrl,
        order: formData.order,
        isActive: formData.isActive,
      };

      if (editingIndex !== null) {
        // Update existing item
        const response = await axios.put(
          `${API_ENDPOINTS.GALLERY}/${galleryItems[editingIndex]._id}`,
          newItem
        );
        const updatedItems = [...galleryItems];
        updatedItems[editingIndex] = response.data;
        setGalleryItems(updatedItems);
        setSuccess("Gallery item updated successfully");
      } else {
        // Add new item
        const response = await axios.post(API_ENDPOINTS.GALLERY, newItem);
        setGalleryItems([...galleryItems, response.data]);
        setSuccess("Gallery item added successfully");
      }

      setTimeout(() => setSuccess(""), 3000);
      handleCloseModal();
    } catch (err) {
      setError("Failed to save gallery item");
    }
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await axios.delete(`${API_ENDPOINTS.GALLERY}/${galleryItems[index]._id}`);
        const updatedItems = galleryItems.filter((_, i) => i !== index);
        setGalleryItems(updatedItems);
        setSuccess("Gallery item deleted successfully");
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Failed to delete gallery item");
      }
    }
  };

  const handleToggleActive = async (index) => {
    try {
      const item = galleryItems[index];
      const updatedItem = { ...item, isActive: !item.isActive };
      const response = await axios.put(`${API_ENDPOINTS.GALLERY}/${item._id}`, updatedItem);
      const updatedItems = [...galleryItems];
      updatedItems[index] = response.data;
      setGalleryItems(updatedItems);
      setSuccess(
        updatedItem.isActive
          ? "Gallery item activated successfully"
          : "Gallery item deactivated successfully"
      );
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to toggle gallery item status");
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading gallery items...</div>;
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2>Gallery Management</h2>
          <p className="text-muted">Manage your organization's gallery images</p>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="border-0 shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Gallery Items</h5>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleShowModal()}
          >
            + Add Gallery Item
          </Button>
        </Card.Header>
        <Card.Body>
          {galleryItems.length === 0 ? (
            <p className="text-muted">No gallery items added yet.</p>
          ) : (
            <Row>
              {galleryItems.map((item, index) => (
                <Col md={6} lg={4} key={index} className="mb-3">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className="flex-grow-1">
                          <h6>{item.title}</h6>
                          <p className="text-muted mb-2">{item.caption}</p>
                          <small className="text-muted">
                            Order: {item.order} | Status: {item.isActive ? "Active" : "Inactive"}
                          </small>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => handleShowModal(index)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="sm"
                            variant={item.isActive ? "outline-warning" : "outline-success"}
                            onClick={() => handleToggleActive(index)}
                          >
                            {item.isActive ? "Deactivate" : "Activate"}
                          </Button>
                        </div>
                      </div>
                      {item.imageUrl && (
                        <div className="mt-3">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                            }}
                          />
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingIndex !== null ? "Edit Gallery Item" : "Add Gallery Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.caption}
                onChange={(e) =>
                  setFormData({ ...formData, caption: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL *</Form.Label>
              <Form.Control
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Display Order</Form.Label>
              <Form.Control
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
            </Form.Group>
          </Form>
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

export default GalleryManagement;
