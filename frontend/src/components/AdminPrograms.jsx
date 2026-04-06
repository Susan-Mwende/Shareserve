import { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";

function AdminPrograms() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5001/api/programs", {
      title,
      description,
      image,
    });

    alert("Program added successfully ✅");

    setTitle("");
    setDescription("");
    setImage("");
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h4>Add New Program</h4>

        <Form onSubmit={handleSubmit}>
          
          {/* TITLE */}
          <Form.Group className="mb-3">
            <Form.Label>Program Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter program title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          {/* DESCRIPTION */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Program description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          {/* IMAGE LINK (THIS IS WHERE YOU PASTE LINK) */}
          <Form.Group className="mb-3">
            <Form.Label>Image URL (HTTPS)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Paste image link from Unsplash/Pexels"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Save Program
          </Button>

        </Form>
      </Card>
    </Container>
  );
}

export default AdminPrograms;