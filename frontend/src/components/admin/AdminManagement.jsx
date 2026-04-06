import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/auth/admins');
      setAdmins(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admins:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', formData);
      setSuccess('Admin user created successfully!');
      setShowModal(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'admin'
      });
      fetchAdmins(); // Refresh the list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create admin user');
    }
  };

  const handleDelete = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin user?')) {
      try {
        await axios.delete(`http://localhost:5001/api/auth/admins/${adminId}`);
        setSuccess('Admin user deleted successfully!');
        fetchAdmins();
      } catch (error) {
        setError('Failed to delete admin user');
      }
    }
  };

  const handleToggleActive = async (adminId, isActive) => {
    try {
      await axios.patch(`http://localhost:5001/api/auth/admins/${adminId}`, { isActive: !isActive });
      setSuccess(`Admin user ${!isActive ? 'activated' : 'deactivated'} successfully!`);
      fetchAdmins();
    } catch (error) {
      setError('Failed to update admin status');
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Management</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Create New Admin
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.firstName} {admin.lastName}</td>
                  <td>{admin.email}</td>
                  <td>
                    <span className={`badge bg-${admin.role === 'super_admin' ? 'danger' : 'primary'}`}>
                      {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${admin.isActive ? 'success' : 'secondary'}`}>
                      {admin.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Button
                        variant={admin.isActive ? 'warning' : 'success'}
                        size="sm"
                        onClick={() => handleToggleActive(admin._id, admin.isActive)}
                        disabled={admin.role === 'super_admin'}
                      >
                        {admin.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(admin._id)}
                        disabled={admin.role === 'super_admin'}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Create Admin Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Admin User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Admin
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminManagement;
