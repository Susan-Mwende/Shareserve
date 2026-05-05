import { Modal, Button, Card, Alert, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useState } from 'react';

const CreditCardPaymentModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    amount: '',
    email: '',
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Kenya'
    },
    isRecurring: false,
    frequency: 'monthly'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const predefinedAmounts = [10, 25, 50, 100, 250, 500, 1000];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('billing')) {
      const billingField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [billingField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form
      if (!formData.amount || !formData.email || !formData.firstName || !formData.lastName) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        throw new Error('Please enter a valid 16-digit card number');
      }

      if (formData.cvv.length !== 3) {
        throw new Error('Please enter a valid 3-digit CVV');
      }

      // Simulate payment processing (replace with actual Stripe integration)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Thank you for your donation! Your payment has been processed successfully.');
      
      // Reset form
      setTimeout(() => {
        setFormData({
          amount: '',
          email: '',
          firstName: '',
          lastName: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          billingAddress: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'Kenya'
          },
          isRecurring: false,
          frequency: 'monthly'
        });
        onHide();
      }, 3000);
      
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ backgroundColor: '#198754', color: 'white' }}>
        <Modal.Title className="d-flex align-items-center">
          <span className="me-2">💳</span>
          Credit Card Donation
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        {success && (
          <Alert variant="success" className="mb-4">
            <Alert.Heading className="d-flex align-items-center">
              <span className="me-2">✅</span>
              Payment Successful!
            </Alert.Heading>
            <p>{success}</p>
          </Alert>
        )}
        
        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading className="d-flex align-items-center">
              <span className="me-2">❌</span>
              Payment Error
            </Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {!success && (
          <Form onSubmit={handleSubmit}>
            {/* Donation Amount */}
            <Card className="mb-4 border-success">
              <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
                <h5 className="mb-0">Donation Amount</h5>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  {predefinedAmounts.map((amount) => (
                    <Col key={amount} xs={4} md={3} className="mb-2">
                      <Button
                        variant={formData.amount === amount.toString() ? 'success' : 'outline-success'}
                        className="w-100"
                        onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                      >
                        ${amount}
                      </Button>
                    </Col>
                  ))}
                </Row>
                
                <Form.Group>
                  <Form.Label>Custom Amount (USD)</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="Enter custom amount"
                    min="1"
                    required
                  />
                </Form.Group>

                <div className="mt-3">
                  <Form.Check
                    type="checkbox"
                    name="isRecurring"
                    checked={formData.isRecurring}
                    onChange={handleInputChange}
                    label="Make this a recurring donation"
                    className="mb-2"
                  />
                  {formData.isRecurring && (
                    <Form.Select
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      className="mt-2"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                    </Form.Select>
                  )}
                </div>
              </Card.Body>
            </Card>

            {/* Personal Information */}
            <Card className="mb-4 border-success">
              <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
                <h5 className="mb-0">Personal Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    required
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Card Information */}
            <Card className="mb-4 border-success">
              <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
                <h5 className="mb-0">Card Information</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Card Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const formatted = formatCardNumber(e.target.value);
                      setFormData(prev => ({ ...prev, cardNumber: formatted }));
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date *</Form.Label>
                      <Form.Control
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setFormData(prev => ({ ...prev, expiryDate: formatted }));
                        }}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV *</Form.Label>
                      <Form.Control
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          setFormData(prev => ({ ...prev, cvv: value }));
                        }}
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Billing Address */}
            <Card className="mb-4 border-success">
              <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
                <h5 className="mb-0">Billing Address</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="billing.street"
                    value={formData.billingAddress.street}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="billing.city"
                        value={formData.billingAddress.city}
                        onChange={handleInputChange}
                        placeholder="Nairobi"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>State/Province</Form.Label>
                      <Form.Control
                        type="text"
                        name="billing.state"
                        value={formData.billingAddress.state}
                        onChange={handleInputChange}
                        placeholder="Nairobi County"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>ZIP/Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="billing.zipCode"
                        value={formData.billingAddress.zipCode}
                        onChange={handleInputChange}
                        placeholder="00100"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Select
                        name="billing.country"
                        value={formData.billingAddress.country}
                        onChange={handleInputChange}
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Security Notice */}
            <Alert variant="info" className="mb-4">
              <Alert.Heading className="d-flex align-items-center">
                <span className="me-2">🔒</span>
                Secure Payment
              </Alert.Heading>
              <p className="mb-0">
                Your payment information is encrypted and secure. We use industry-standard 
                security measures to protect your personal and financial data.
              </p>
            </Alert>

            <div className="d-grid gap-2">
              <Button
                variant="success"
                type="submit"
                disabled={loading}
                className="btn-lg"
              >
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Processing Payment...
                  </>
                ) : (
                  `Donate $${formData.amount || '0'} ${formData.isRecurring ? formData.frequency : 'One-time'}`
                )}
              </Button>
              
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CreditCardPaymentModal;
