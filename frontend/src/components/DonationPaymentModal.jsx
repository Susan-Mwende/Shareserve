import { Modal, Button, Alert, Nav, Tab } from 'react-bootstrap';
import MpesaPaymentModal from './MpesaPaymentModal.jsx';
import CreditCardPaymentModal from './CreditCardPaymentModal.jsx';

const DonationPaymentModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton style={{ backgroundColor: '#198754', color: 'white' }}>
        <Modal.Title className="d-flex align-items-center">
          <span className="me-2">💝</span>
          Make a Donation
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-0">
        <Tab.Container defaultActiveKey="mpesa">
          <Nav variant="tabs" className="border-0 bg-light">
            <Nav.Item>
              <Nav.Link eventKey="mpesa" className="text-success fw-bold">
                📱 M-Pesa Payment
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="card" className="text-success fw-bold">
                💳 Credit/Debit Card
              </Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Tab.Content className="p-4">
            <Tab.Pane eventKey="mpesa">
              <MpesaPaymentModal show={true} onHide={() => {}} />
            </Tab.Pane>
            
            <Tab.Pane eventKey="card">
              <CreditCardPaymentModal show={true} onHide={() => {}} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
      
      <Modal.Footer className="border-top">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DonationPaymentModal;
