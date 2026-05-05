import { Modal, Button, Alert, Form, Row, Col, Spinner, Card } from 'react-bootstrap';
import { useState } from 'react';
import { usePaystack } from '../contexts/PaystackContext';

const PaystackDonationModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment Method, 3: Donor Info, 4: Processing
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
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { processPayment } = usePaystack();

  const predefinedAmounts = [100, 500, 1000, 2500, 5000, 10000, 20000]; // In KES

  const handleAmountSelect = (amount) => {
    setDonationData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('donorInfo')) {
      const [category, field] = name.split('.');
      setDonationData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setDonationData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !donationData.amount) {
      setError('Please select or enter a donation amount');
      return;
    }
    
    if (step === 3 && !donationData.donorInfo.email) {
      setError('Please enter your email address');
      return;
    }
    
    setError('');
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handlePaymentSuccess = (paymentResult) => {
    setSuccess(`Thank you for your KES ${donationData.amount} ${donationData.isRecurring ? donationData.frequency : 'one-time'} donation! Your payment has been processed successfully.`);
    
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
        }
      });
      setStep(1);
      onHide();
    }, 3000);
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  const handlePaystackPayment = async () => {
    setLoading(true);
    setError('');

    try {
      await processPayment(
        {
          amount: parseFloat(donationData.amount),
          email: donationData.donorInfo.email,
          metadata: {
            donorName: `${donationData.donorInfo.firstName} ${donationData.donorInfo.lastName}`,
            donorPhone: donationData.donorInfo.phone,
            isRecurring: donationData.isRecurring.toString(),
            frequency: donationData.frequency,
            source: 'shareserve-website'
          }
        },
        handlePaymentSuccess,
        handlePaymentError
      );
    } catch (err) {
      setError(err.message);
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
                KES {amount}
              </Button>
            </Col>
          ))}
        </Row>
        
        <Form.Group className="mb-3">
          <Form.Label>Or Enter Custom Amount (KES)</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={donationData.amount}
            onChange={handleInputChange}
            placeholder="Enter any amount"
            min="100"
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
            <strong>Amount:</strong> KES {donationData.amount} {donationData.isRecurring ? `(${donationData.frequency})` : '(one-time)'}
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
                <h5 className="text-success">Card/Other</h5>
                <p className="text-muted small">Pay with card, bank transfer, etc.</p>
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
            Continue to Donor Information →
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

  const renderDonorInfoStep = () => {
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
                <strong>Amount:</strong> KES {donationData.amount} {donationData.isRecurring ? `(${donationData.frequency})` : '(one-time)'}
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
                <li>Enter amount: <strong>KES {donationData.amount}</strong></li>
                <li>Confirm payment</li>
              </ol>
            </Alert>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handlePreviousStep}>
                ← Back
              </Button>
              <Button variant="success" onClick={() => {
                setSuccess(`Thank you for your KES ${donationData.amount} donation! Please complete the M-Pesa payment using the instructions above.`);
                setTimeout(() => {
                  setStep(1);
                  onHide();
                }, 5000);
              }}>
                Complete Donation
              </Button>
            </div>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card className="border-success">
        <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
          <h5 className="mb-0">Step 3: Donor Information</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <h6>Donation Summary:</h6>
            <p className="mb-2">
              <strong>Amount:</strong> KES {donationData.amount} {donationData.isRecurring ? `(${donationData.frequency})` : '(one-time)'}
            </p>
          </div>

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

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="donorInfo.phone"
              value={donationData.donorInfo.phone}
              onChange={handleInputChange}
              placeholder="0712 345678"
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handlePreviousStep}>
              ← Back
            </Button>
            <Button variant="success" onClick={handleNextStep}>
              Continue to Payment →
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderProcessingStep = () => (
    <Card className="border-success">
      <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
        <h5 className="mb-0">Step 4: Complete Payment</h5>
      </Card.Header>
      <Card.Body className="text-center">
        <div className="mb-4">
          <h6>Donation Summary:</h6>
          <p className="mb-2">
            <strong>Amount:</strong> KES {donationData.amount} {donationData.isRecurring ? `(${donationData.frequency})` : '(one-time)'}
          </p>
          <p className="mb-2">
            <strong>Donor:</strong> {donationData.donorInfo.firstName} {donationData.donorInfo.lastName}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {donationData.donorInfo.email}
          </p>
        </div>

        <Alert variant="info">
          <h6>Payment Information:</h6>
          <p className="mb-0">
            You will be redirected to Paystack's secure payment page to complete your donation.
            Paystack accepts multiple payment methods including:
          </p>
          <ul className="text-start mt-2">
            <li>Debit/Credit Cards (Visa, Mastercard)</li>
            <li>Bank Transfer</li>
            <li>USSD</li>
            <li>QR Code</li>
          </ul>
        </Alert>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handlePreviousStep} disabled={loading}>
            ← Back
          </Button>
          <Button variant="success" onClick={handlePaystackPayment} disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                Opening Payment Portal...
              </>
            ) : (
              `Pay KES ${donationData.amount}`
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );

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
          <>
            {/* Progress Indicator */}
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <span className={`badge ${step >= 1 ? 'bg-success' : 'bg-secondary'}`}>1. Amount</span>
                <span className={`badge ${step >= 2 ? 'bg-success' : 'bg-secondary'}`}>2. Payment Method</span>
                <span className={`badge ${step >= 3 ? 'bg-success' : 'bg-secondary'}`}>3. Information</span>
                <span className={`badge ${step >= 4 ? 'bg-success' : 'bg-secondary'}`}>4. Payment</span>
              </div>
              <div className="progress mt-2" style={{ height: '5px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {step === 1 && renderAmountStep()}
            {step === 2 && renderPaymentMethodStep()}
            {step === 3 && renderDonorInfoStep()}
            {step === 4 && renderProcessingStep()}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PaystackDonationModal;
