import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ShareServe logo.jpeg';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate('/admin');
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6} lg={4}>
            <Card className="login-card shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <img 
                    src={logo} 
                    alt="ShareServe" 
                    style={{ 
                      height: '60px', 
                      marginBottom: '15px',
                      borderRadius: '8px'
                    }}
                  />
                  <h2 className="fw-bold text-primary">ShareServe</h2>
                  <p className="text-muted">Admin Portal</p>
                </div>

                {error && (
                  <Alert variant="danger" dismissible onClose={clearError}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="py-2"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="py-2"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-2 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Signing in...</span>
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </Form>

                <div className="text-center">
                  <small className="text-muted">
                    Secure admin access only
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
