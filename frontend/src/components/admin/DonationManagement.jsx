import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Alert,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";

const DonationManagement = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalAmount: 0,
    donationsByProgram: [],
    monthlyDonations: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    program: "",
    status: "",
  });

  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    amount: "",
    currency: "USD",
    donationType: "one-time",
    program: "General",
    message: "",
    status: "completed",
    paymentMethod: "credit-card",
    isAnonymous: false,
  });

  useEffect(() => {
    fetchDonations();
    fetchStats();
  }, [currentPage, filters]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        ...(filters.program && { program: filters.program }),
        ...(filters.status && { status: filters.status }),
      });

      const response = await axios.get(
        `http://localhost:5001/api/donations?${params}`
      );
      setDonations(response.data.donations);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch donations");
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/donations/stats/summary"
      );
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const handleShowModal = () => {
    setFormData({
      donorName: "",
      email: "",
      amount: 0,
      currency: "USD",
      donationType: "one-time",
      program: "General",
      message: "",
      status: "completed",
      paymentMethod: "credit-card",
      isAnonymous: false,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.donorName && !formData.isAnonymous) {
      setError("Donor name is required");
      return;
    }
    
    if (!formData.email && !formData.isAnonymous) {
      setError("Email is required");
      return;
    }
    
    if (!formData.amount || formData.amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    
    try {
      const submissionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        donorName: formData.isAnonymous ? "Anonymous" : formData.donorName,
        email: formData.isAnonymous ? "anonymous@shareserve.org" : formData.email
      };
      
      console.log("Submitting donation data:", submissionData);
      
      await axios.post("http://localhost:5001/api/donations", submissionData);
      setSuccess("Donation recorded successfully");
      fetchDonations();
      fetchStats();
      handleCloseModal();
      // Reset form
      setFormData({
        donorName: "",
        email: "",
        amount: "",
        currency: "USD",
        donationType: "one-time",
        program: "General",
        message: "",
        status: "completed",
        paymentMethod: "credit-card",
        isAnonymous: false,
      });
    } catch (err) {
      console.error("Donation submission error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to record donation");
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    const variant = {
      completed: "success",
      pending: "warning",
      failed: "danger",
    }[status];
    return <Badge bg={variant}>{status}</Badge>;
  };

  const getDonationTypeBadge = (type) => {
    const variant = {
      "one-time": "primary",
      monthly: "info",
      annual: "secondary",
    }[type];
    return <Badge bg={variant}>{type}</Badge>;
  };

  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  if (loading && donations.length === 0) {
    return <div className="text-center p-4">Loading donations...</div>;
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2>Donation Management</h2>
          <p className="text-muted">View and manage donation records</p>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShowModal}>
            + Record Donation
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <h3 className="text-primary">{stats.totalDonations}</h3>
              <p className="text-muted mb-0">Total Donations</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <h3 className="text-success">
                {formatCurrency(stats.totalAmount)}
              </h3>
              <p className="text-muted mb-0">Total Amount</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <h3 className="text-info">
                {stats.donationsByProgram.reduce((acc, prog) => acc + prog.count, 0)}
              </h3>
              <p className="text-muted mb-0">This Month</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center">
              <h3 className="text-warning">
                {stats.totalDonations > 0
                  ? formatCurrency(stats.totalAmount / stats.totalDonations)
                  : "$0"}
              </h3>
              <p className="text-muted mb-0">Average Donation</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Program</Form.Label>
                <Form.Select
                  value={filters.program}
                  onChange={(e) => handleFilterChange("program", e.target.value)}
                >
                  <option value="">All Programs</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Livelihood">Livelihood</option>
                  <option value="General">General</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>&nbsp;</Form.Label>
                <div>
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setFilters({ program: "", status: "" });
                      setCurrentPage(1);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Donations Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Program</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation._id}>
                  <td>
                    {donation.isAnonymous ? "Anonymous" : donation.donorName}
                  </td>
                  <td>{donation.isAnonymous ? "-" : donation.email}</td>
                  <td>{formatCurrency(donation.amount, donation.currency)}</td>
                  <td>{getDonationTypeBadge(donation.donationType)}</td>
                  <td>{donation.program}</td>
                  <td>{getStatusBadge(donation.status)}</td>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Button
                variant="outline-primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="me-2"
              >
                Previous
              </Button>
              <span className="align-self-center">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline-primary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="ms-2"
              >
                Next
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add Donation Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Record New Donation</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Donor Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.donorName}
                    onChange={(e) =>
                      setFormData({ ...formData, donorName: e.target.value })
                    }
                    disabled={formData.isAnonymous}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={formData.isAnonymous}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Currency</Form.Label>
                  <Form.Select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Donation Type</Form.Label>
                  <Form.Select
                    value={formData.donationType}
                    onChange={(e) =>
                      setFormData({ ...formData, donationType: e.target.value })
                    }
                  >
                    <option value="one-time">One-time</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Program</Form.Label>
                  <Form.Select
                    value={formData.program}
                    onChange={(e) =>
                      setFormData({ ...formData, program: e.target.value })
                    }
                  >
                    <option value="General">General</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Livelihood">Livelihood</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank-transfer">Bank Transfer</option>
                    <option value="mobile-money">Mobile Money</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Message (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Anonymous donation"
                checked={formData.isAnonymous}
                onChange={(e) =>
                  setFormData({ ...formData, isAnonymous: e.target.checked })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Record Donation
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DonationManagement;
