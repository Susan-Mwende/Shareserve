import { Modal, Button, Alert, Form, Row, Col, Spinner, Card } from 'react-bootstrap';
import { useState } from 'react';

const UnifiedDonationModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment Method, 3: Payment Details
  const [donationData, setDonationData] = useState({
    amount: '',
    isRecurring: false,
    frequency: 'monthly',
    paymentMethod: '', // 'mpesa' or 'card'
    donorInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    cardInfo: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Kenya'
      }
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const predefinedAmounts = [10, 25, 50, 100, 250, 500, 1000];

  const handleAmountSelect = (amount) => {
    setDonationData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('cardInfo') || name.startsWith('donorInfo')) {
      const [category, field] = name.split('.');
      setDonationData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else if (name.startsWith('billing')) {
      const billingField = name.split('.')[1];
      setDonationData(prev => ({
        ...prev,
        cardInfo: {
          ...prev.cardInfo,
          billingAddress: {
            ...prev.cardInfo.billingAddress,
            [billingField]: value
          }
        }
      }));
    } else {
      setDonationData(prev => ({
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

  const handleNextStep = () => {
    if (step === 1 && !donationData.amount) {
      setError('Please select or enter a donation amount');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate based on payment method
      if (donationData.paymentMethod === 'card') {
        if (!donationData.donorInfo.firstName || !donationData.donorInfo.lastName || !donationData.donorInfo.email) {
          throw new Error('Please fill in all required donor information');
        }
        if (donationData.cardInfo.cardNumber.replace(/\s/g, '').length !== 16) {
          throw new Error('Please enter a valid 16-digit card number');
        }
        if (donationData.cardInfo.cvv.length !== 3) {
          throw new Error('Please enter a valid 3-digit CVV');
        }
      } else if (donationData.paymentMethod === 'mpesa') {
        if (!donationData.donorInfo.phone) {
          throw new Error('Please enter your phone number for M-Pesa payment');
        }
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(`Thank you for your $${donationData.amount} ${donationData.isRecurring ? donationData.frequency : 'one-time'} donation! Your payment has been processed successfully.`);
      
      // Reset form after success
      setTimeout(() => {
        setDonationData({
          amount: '',
          isRecurring: false,
          frequency: 'monthly',
          paymentMethod: '',
          donorInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
          },
          cardInfo: {
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            billingAddress: {
              street: '',
              city: '',
              state: '',
              zipCode: '',
              country: 'Kenya'
            }
          }
        });
        setStep(1);
        onHide();
      }, 3000);
      
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderAmountStep = () => (
    <Card className="border-success">
      <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
        <h5 className="mb-0">Step 1: Choose Your Donation Amount</h5>
      </Card.Header>
      <Card.Body>
        <Row className="mb-3">
          {predefinedAmounts.map((amount) => (
            <Col key={amount} xs={4} md={3} className="mb-2">
              <Button
                variant={donationData.amount === amount.toString() ? 'success' : 'outline-success'}
                className="w-100"
                onClick={() => handleAmountSelect(amount)}
              >
                ${amount}
              </Button>
            </Col>
          ))}
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Or Enter Custom Amount (USD)</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={donationData.amount}
            onChange={handleInputChange}
            placeholder="Enter any amount"
            min="1"
          />
        </Form.Group>

        <div className="mt-3">
          <Form.Check
            type="checkbox"
            name="isRecurring"
            checked={donationData.isRecurring}
            onChange={handleInputChange}
            label="Make this a recurring donation"
            className="mb-2"
          />
          {donationData.isRecurring && (
            <Form.Select
              name="frequency"
              value={donationData.frequency}
              onChange={handleInputChange}
              className="mt-2"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </Form.Select>
          )}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="success" onClick={handleNextStep} disabled={!donationData.amount}>
            Continue to Payment Method →
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  const renderPaymentMethodStep = () => (
    <Card className="border-success">
      <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
        <h5 className="mb-0">Step 2: Choose Payment Method</h5>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <h6>Donation Summary:</h6>
          <p className="mb-2">
            <strong>Amount:</strong> ${donationData.amount} {donationData.isRecurring ? `(${donationData.frequency})` : '(one-time)'}
          </p>
        </div>

        <Row>
          <Col md={6}>
            <Card 
              className={`h-100 ${donationData.paymentMethod === 'mpesa' ? 'border-success border-2' : 'border-secondary'}`}
              onClick={() => setDonationData(prev => ({ ...prev, paymentMethod: 'mpesa' }))}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="text-center">
                <div className="mb-3">
                  <span style={{ fontSize: '2rem' }}>📱</span>
                </div>
                <h5 className="text-success">M-Pesa</h5>
                <p className="text-muted small">Pay with M-Pesa mobile money</p>
                {donationData.paymentMethod === 'mpesa' && (
                  <div className="mt-2">
                    <span className="badge bg-success">Selected</span>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card 
              className={`h-100 ${donationData.paymentMethod === 'card' ? 'border-success border-2' : 'border-secondary'}`}
              onClick={() => setDonationData(prev => ({ ...prev, paymentMethod: 'card' }))}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body className="text-center">
                <div className="mb-3">
                  <span style={{ fontSize: '2rem' }}>💳</span>
                </div>
                <h5 className="text-success">Credit/Debit Card</h5>
                <p className="text-muted small">Pay with Visa, Mastercard, etc.</p>
                {donationData.paymentMethod === 'card' && (
                  <div className="mt-2">
                    <span className="badge bg-success">Selected</span>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={handlePreviousStep}>
            ← Back
          </Button>
          <Button variant="success" onClick={handleNextStep} disabled={!donationData.paymentMethod}>
            Continue to Payment Details →
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  const renderPaymentDetailsStep = () => {
    if (donationData.paymentMethod === 'mpesa') {
      return (
        <Card className="border-success">
          <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
            <h5 className="mb-0">Step 3: M-Pesa Payment Details</h5>
          </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <h6>Donation Summary:</h6>
              <p className="mb-2">
                <strong>Amount:</strong> ${donationData.amount} {donationData.isRecurring ? `(${donationData.frequency})` : '(one-time)'}
              </p>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                name="donorInfo.phone"
                value={donationData.donorInfo.phone}
                onChange={handleInputChange}
                placeholder="0712 345678"
                required
              />
            </Form.Group>

            <Alert variant="info">
              <h6>M-Pesa Payment Instructions:</h6>
              <ol>
                <li>Go to M-Pesa menu</li>
                <li>Select "Pay Bill"</li>
                <li>Enter Business Number: <strong>174379</strong></li>
                <li>Enter Account Number: <strong>SHARESERVE</strong></li>
                <li>Enter amount: <strong>${donationData.amount}</strong></li>
                <li>Confirm payment</li>
              </ol>
            </Alert>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handlePreviousStep}>
                ← Back
              </Button>
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  `Complete $${donationData.amount} Donation`
                )}
              </Button>
            </div>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card className="border-success">
        <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
          <h5 className="mb-0">Step 3: Card Payment Details</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <h6>Donation Summary:</h6>
            <p className="mb-2">
              <strong>Amount:</strong> ${donationData.amount} {donationData.isRecurring ? `(${donationData.frequency})` : '(one-time)'}
            </p>
          </div>

          {/* Donor Information */}
          <h6 className="mb-3">Personal Information</h6>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="donorInfo.firstName"
                  value={donationData.donorInfo.firstName}
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
                  name="donorInfo.lastName"
                  value={donationData.donorInfo.lastName}
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
              name="donorInfo.email"
              value={donationData.donorInfo.email}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
              required
            />
          </Form.Group>

          {/* Card Information */}
          <h6 className="mb-3">Card Information</h6>
          <Form.Group className="mb-3">
            <Form.Label>Card Number *</Form.Label>
            <Form.Control
              type="text"
              name="cardInfo.cardNumber"
              value={donationData.cardInfo.cardNumber}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                setDonationData(prev => ({
                  ...prev,
                  cardInfo: { ...prev.cardInfo, cardNumber: formatted }
                }));
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
                  name="cardInfo.expiryDate"
                  value={donationData.cardInfo.expiryDate}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value);
                    setDonationData(prev => ({
                      ...prev,
                      cardInfo: { ...prev.cardInfo, expiryDate: formatted }
                    }));
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
                  name="cardInfo.cvv"
                  value={donationData.cardInfo.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setDonationData(prev => ({
                      ...prev,
                      cardInfo: { ...prev.cardInfo, cvv: value }
                    }));
                  }}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handlePreviousStep}>
              ← Back
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Processing...
                </>
              ) : (
                `Complete $${donationData.amount} Donation`
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ backgroundColor: '#198754', color: 'white' }}>
        <Modal.Title className="d-flex align-items-center">
          <span className="me-2">💝</span>
          Make a Donation
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
            {/* Progress Indicator */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className={`badge ${step >= 1 ? 'bg-success' : 'bg-secondary'}`}>1. Amount</span>
                <span className={`badge ${step >= 2 ? 'bg-success' : 'bg-secondary'}`}>2. Payment Method</span>
                <span className={`badge ${step >= 3 ? 'bg-success' : 'bg-secondary'}`}>3. Details</span>
              </div>
              <div className="progress mt-2" style={{ height: '5px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {step === 1 && renderAmountStep()}
            {step === 2 && renderPaymentMethodStep()}
            {step === 3 && renderPaymentDetailsStep()}
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UnifiedDonationModal;
