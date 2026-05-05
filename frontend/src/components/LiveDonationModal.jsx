import { Modal, Button, Alert, Form, Row, Col, Spinner, Card } from 'react-bootstrap';
import { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ donationData, onBack, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/donation-success`,
          payment_method_data: {
            billing_details: {
              name: `${donationData.donorInfo.firstName} ${donationData.donorInfo.lastName}`,
              email: donationData.donorInfo.email,
              address: {
                line1: donationData.cardInfo.billingAddress.street,
                city: donationData.cardInfo.billingAddress.city,
                state: donationData.cardInfo.billingAddress.state,
                postal_code: donationData.cardInfo.billingAddress.zipCode,
                country: donationData.cardInfo.billingAddress.country,
              },
            },
          },
        },
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message);
        } else {
          setMessage('An unexpected error occurred.');
        }
        onError(error.message);
      } else if (paymentIntent) {
        setMessage('Payment successful!');
        onSuccess(paymentIntent);
      }
    } catch (err) {
      setMessage('Payment failed. Please try again.');
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PaymentElement />
      
      {message && (
        <Alert variant={message.includes('successful') ? 'success' : 'danger'} className="mt-3">
          {message}
        </Alert>
      )}

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={onBack} disabled={loading}>
          ← Back
        </Button>
        <Button variant="success" type="submit" disabled={!stripe || loading}>
          {loading ? (
            <>
              <Spinner as="span" animation="border" size="sm" className="me-2" />
              Processing Payment...
            </>
          ) : (
            `Complete $${donationData.amount} Donation`
          )}
        </Button>
      </div>
    </Form>
  );
};

const LiveDonationModal = ({ show, onHide }) => {
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment Method, 3: Donor Info, 4: Payment
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
  const [clientSecret, setClientSecret] = useState('');

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

  const handleNextStep = async () => {
    if (step === 1 && !donationData.amount) {
      setError('Please select or enter a donation amount');
      return;
    }
    
    if (step === 3 && donationData.paymentMethod === 'card') {
      // Create payment intent before proceeding to payment
      await createPaymentIntent();
    }
    
    setError('');
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setError('');
    setStep(step - 1);
  };

  const createPaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payment/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationData.amount,
          currency: 'usd',
          metadata: {
            donorName: `${donationData.donorInfo.firstName} ${donationData.donorInfo.lastName}`,
            donorEmail: donationData.donorInfo.email,
            isRecurring: donationData.isRecurring.toString(),
            frequency: donationData.frequency,
            source: 'shareserve-website'
          }
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create payment intent');
      }

      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
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
      setClientSecret('');
      onHide();
    }, 3000);
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
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
              <Button variant="success" onClick={() => {
                setSuccess(`Thank you for your $${donationData.amount} donation! Please complete the M-Pesa payment using the instructions above.`);
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
              <strong>Amount:</strong> ${donationData.amount} {donationData.isRecurring ? `(${donationData.frequency})` : '(one-time)'}
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

          <h6 className="mb-3">Billing Address</h6>
          <Form.Group className="mb-3">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              name="billing.street"
              value={donationData.cardInfo.billingAddress.street}
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
                  value={donationData.cardInfo.billingAddress.city}
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
                  value={donationData.cardInfo.billingAddress.state}
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
                  value={donationData.cardInfo.billingAddress.zipCode}
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
                  value={donationData.cardInfo.billingAddress.country}
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

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handlePreviousStep}>
              ← Back
            </Button>
            <Button variant="success" onClick={handleNextStep} disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" className="me-2" />
                  Setting up payment...
                </>
              ) : (
                'Continue to Payment →'
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderPaymentStep = () => {
    if (!clientSecret) {
      return (
        <Card className="border-success">
          <Card.Body className="text-center">
            <Spinner animation="border" className="me-2" />
            Setting up secure payment...
          </Card.Body>
        </Card>
      );
    }

    const options = {
      clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#198754',
          colorBackground: '#ffffff',
          colorText: '#333333',
        },
      },
    };

    return (
      <Card className="border-success">
        <Card.Header className="text-white" style={{ backgroundColor: '#198754' }}>
          <h5 className="mb-0">Step 4: Complete Payment</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <h6>Donation Summary:</h6>
            <p className="mb-2">
              <strong>Amount:</strong> ${donationData.amount} {donationData.isRecurring ? `(${donationData.frequency})` : '(one-time)'}
            </p>
            <p className="mb-2">
              <strong>Donor:</strong> {donationData.donorInfo.firstName} {donationData.donorInfo.lastName}
            </p>
          </div>

          <CheckoutForm
            donationData={donationData}
            onBack={handlePreviousStep}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            options={options}
          />
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
            {step === 4 && renderPaymentStep()}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default LiveDonationModal;
