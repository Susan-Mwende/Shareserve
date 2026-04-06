import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Alert, Spinner, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api.js';

const SessionMonitoring = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.SESSIONS);
      setSessions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setError('Failed to fetch sessions');
      setLoading(false);
    }
  };

  const handleEndSession = async (sessionId) => {
    try {
      await axios.post(`${API_ENDPOINTS.SESSIONS}/${sessionId}/end`);
      setSuccess('Session ended successfully');
      fetchSessions();
    } catch (error) {
      setError('Failed to end session');
    }
  };

  const handleViewDetails = (session) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getStatusBadge = (isActive) => {
    return (
      <Badge bg={isActive ? 'success' : 'secondary'}>
        {isActive ? 'Active' : 'Ended'}
      </Badge>
    );
  };

  const getActivityLevel = (lastActivity) => {
    const now = new Date();
    const activityTime = new Date(lastActivity);
    const diffMinutes = (now - activityTime) / (1000 * 60);
    
    if (diffMinutes < 5) return { level: 'High', color: 'success' };
    if (diffMinutes < 30) return { level: 'Medium', color: 'warning' };
    return { level: 'Low', color: 'danger' };
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
        <h2>Session Monitoring</h2>
        <Button variant="outline-primary" onClick={fetchSessions}>
          Refresh
        </Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Row>
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Admin Sessions</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Admin</th>
                    <th>Login Time</th>
                    <th>Logout Time</th>
                    <th>Duration</th>
                    <th>IP Address</th>
                    <th>Status</th>
                    <th>Activity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => {
                    const activity = getActivityLevel(session.lastActivity);
                    return (
                      <tr key={session._id}>
                        <td>
                          <div>
                            <strong>{session.adminId?.firstName} {session.adminId?.lastName}</strong>
                            <br />
                            <small className="text-muted">{session.adminId?.email}</small>
                          </div>
                        </td>
                        <td>{formatDate(session.loginTime)}</td>
                        <td>
                          {session.logoutTime ? formatDate(session.logoutTime) : 'Still Active'}
                        </td>
                        <td>{formatDuration(session.duration)}</td>
                        <td>{session.ipAddress}</td>
                        <td>{getStatusBadge(session.isActive)}</td>
                        <td>
                          <Badge bg={activity.color}>
                            {activity.level}
                          </Badge>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <Button
                              variant="outline-info"
                              size="sm"
                              onClick={() => handleViewDetails(session)}
                            >
                              Details
                            </Button>
                            {session.isActive && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleEndSession(session._id)}
                              >
                                End
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Session Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Session Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSession && (
            <div>
              <Row>
                <Col md={6}>
                  <h6>Admin Information</h6>
                  <p><strong>Name:</strong> {selectedSession.adminId?.firstName} {selectedSession.adminId?.lastName}</p>
                  <p><strong>Email:</strong> {selectedSession.adminId?.email}</p>
                  <p><strong>Role:</strong> {selectedSession.adminId?.role}</p>
                </Col>
                <Col md={6}>
                  <h6>Session Information</h6>
                  <p><strong>Login:</strong> {formatDate(selectedSession.loginTime)}</p>
                  <p><strong>Logout:</strong> {selectedSession.logoutTime ? formatDate(selectedSession.logoutTime) : 'Still Active'}</p>
                  <p><strong>Duration:</strong> {formatDuration(selectedSession.duration)}</p>
                  <p><strong>Status:</strong> {selectedSession.isActive ? 'Active' : 'Ended'}</p>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <h6>Connection Details</h6>
                  <p><strong>IP Address:</strong> {selectedSession.ipAddress}</p>
                  <p><strong>Last Activity:</strong> {formatDate(selectedSession.lastActivity)}</p>
                </Col>
                <Col md={6}>
                  <h6>Browser Information</h6>
                  <p><strong>User Agent:</strong></p>
                  <small className="text-muted" style={{ wordBreak: 'break-all' }}>
                    {selectedSession.userAgent}
                  </small>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SessionMonitoring;
