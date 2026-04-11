import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api.js";
import "./Gallery.css";

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GALLERY);
      setGalleryItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch gallery items:", error);
      setLoading(false);
    }
  };

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return <div className="text-center p-4">Loading gallery...</div>;
  }

  return (
    <div className="gallery-section">
      <Container>
        <h2 className="section-title text-center">Gallery</h2>
        <p className="section-subtitle">
          Visual stories of our impact and community work
        </p>
        
        {galleryItems.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No gallery items available yet.</p>
          </div>
        ) : (
          <Row className="g-4">
            {galleryItems.map((item, index) => (
              <Col md={6} lg={4} xl={3} key={index}>
                <Card 
                  className="gallery-card h-100"
                  onClick={() => handleImageClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="gallery-image-container">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="gallery-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                      }}
                    />
                  </div>
                  <Card.Body className="p-3">
                    <Card.Title as="h6" className="mb-2">{item.title}</Card.Title>
                    <Card.Text className="text-muted small">
                      {item.caption && item.caption.length > 80 
                        ? `${item.caption.substring(0, 80)}...` 
                        : item.caption}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Image Modal */}
      <Modal 
        show={!!selectedImage} 
        onHide={handleCloseModal} 
        size="lg" 
        centered
        className="gallery-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {selectedImage && (
            <>
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="modal-image"
                style={{ width: "100%", maxHeight: "60vh", objectFit: "contain" }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                }}
              />
              {selectedImage.caption && (
                <div className="p-3">
                  <p className="mb-0">{selectedImage.caption}</p>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Gallery;
