import { Modal, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const MpesaPaymentModal = ({ show, onHide }) => {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ backgroundColor: '#198754', color: 'white' }}>
        <Modal.Title className="d-flex align-items-center">
          <span className="me-2"></span>
          M-Pesa Payment Details
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-4">
        <Alert variant="success" className="mb-4">
          <Alert.Heading className="d-flex align-items-center">
            <span className="me-2"></span>
            Thank you for supporting ShareServe!
          </Alert.Heading>
          <p className="mb-0">
            Your donation helps us empower communities and create lasting change in Kenya.
            Choose your preferred payment method below.
          </p>
        </Alert>

        {/* Manual Payment Details - Always Visible */}
        <Card className="mb-4">
          <Card.Header className='text-white' style={{ backgroundColor: '#F08000' }}>
            <h5 className="mb-0 d-flex align-items-center">
              <span className="me-2"></span>
              Manual Payment Details
            </h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Card className="h-100 border-warning">
                  <Card.Header className='text-white' style={{ backgroundColor: '#F08000' }}>
                    <h5 className="mb-0 d-flex align-items-center">
                      <span className="me-2"></span>
                      Paybill Option
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="payment-details">
                      <div className="mb-3">
                        <strong>Business Number:</strong>
                        <div className="d-flex align-items-center mt-1">
                          <span className="fs-5 me-2">174379</span>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => copyToClipboard('174379', 'paybill')}
                          >
                            {copied === 'paybill' ? '✓ Copied' : ' Copy'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Account Number:</strong>
                        <div className="d-flex align-items-center mt-1">
                          <span className="fs-5 me-2">SHARESERVE</span>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => copyToClipboard('SHARESERVE', 'account')}
                          >
                            {copied === 'account' ? '✓ Copied' : ' Copy'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="h-100 border-warning">
                  <Card.Header className='text-white' style={{ backgroundColor: '#F08000' }}>
                    <h5 className="mb-0 d-flex align-items-center">
                      <span className="me-2"></span>
                      Send Money Option
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="payment-details">
                      <div className="mb-3">
                        <strong>Phone Number:</strong>
                        <div className="d-flex align-items-center mt-1">
                          <span className="fs-5 me-2">0712 345678</span>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => copyToClipboard('0712 345678', 'phone')}
                          >
                            {copied === 'phone' ? '✓ Copied' : ' Copy'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <strong>Amount:</strong>
                        <div className="d-flex align-items-center mt-1">
                          <span className="fs-5 me-2">Enter Amount</span>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Manual Payment Instructions */}
        <Card className="mt-4 border-warning">
          <Card.Header className='text-white' style={{ backgroundColor: '#F08000' }}>
            <h6 className="mb-0 d-flex align-items-center">
              <span className="me-2"></span>
              How to Pay Manually
            </h6>
          </Card.Header>
          <Card.Body>
            <div className="row">
              <div className="col-md-6">
                <h6 className="text-success mb-3">Using Paybill:</h6>
                <ol className="small">
                  <li>Go to M-Pesa menu</li>
                  <li>Select "Pay Bill"</li>
                  <li>Enter Business Number: <strong>174379</strong></li>
                  <li>Enter Account Number: <strong>SHARESERVE</strong></li>
                  <li>Enter amount and confirm</li>
                </ol>
              </div>
              <div className="col-md-6">
                <h6 className="text-success mb-3">Using Send Money:</h6>
                <ol className="small">
                  <li>Go to M-Pesa menu</li>
                  <li>Select "Send Money"</li>
                  <li>Enter Phone: <strong>0712 345678</strong></li>
                  <li>Enter amount and confirm</li>
                </ol>
              </div>
            </div>
            
            <Alert variant="warning" className="mt-3">
              <small>
                <strong>Note:</strong> These are the official payment methods for ShareServe International. 
                Paybill: 174379, Send Money: 0712 345678
              </small>
            </Alert>
          </Card.Body>
        </Card>
        
        {/* Contact Info */}
        <Alert variant="success" className="mt-4 mb-0">
          <div className="text-center">
            <p className="mb-2">
              <strong>Need Help?</strong>
              <br />
              Contact ShareServe International:
              <br />
              <span className="text-success"> +254 712 345678</span>
              <br />
              <span className="text-success"> info@shareserve.org</span>
            </p>
            <p className="mb-2">
              <strong>Office Hours:</strong>
              <br />
              Monday - Friday: 9:00 AM - 5:00 PM
              <br />
              Saturday: 10:00 AM - 2:00 PM
            </p>
          </div>
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MpesaPaymentModal;
